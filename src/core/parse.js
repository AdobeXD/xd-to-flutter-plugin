/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const xd = require("scenegraph");

const NodeUtils = require("../utils/nodeutils");
const PropType = require("./proptype");
const { diffNodes } = require("./diff");
const { RootNode } = require("./nodes/root");
const { Artboard } = require("./nodes/artboard");
const { Container } = require("./nodes/container");
const { Rectangle } = require("./nodes/rectangle");
const { Ellipse } = require("./nodes/ellipse");
const { Text } = require("./nodes/text");
const { BackgroundBlur, ObjectBlur } = require("./nodes/blur");
const { Blend } = require("./nodes/blend");
const { Component } = require("./nodes/component");
const { Path } = require("./nodes/path");
const { Grid } = require("./nodes/grid");
const { Shape } = require("./nodes/shape");
const { ParameterRef } = require("./parameter");

const { trace } = require('../utils/debug');

const ParseMode = Object.freeze({
	NORMAL : 0,
	SYMBOLS_AS_GROUPS : 1,
});

function gatherArtboards(xdNode, ctx) {
	if (xdNode instanceof xd.Artboard) {
		let comp = new Artboard(xdNode);
		ctx.addArtboard(comp);
	} else {
		xdNode.children.forEach((child) => gatherArtboards(child, ctx));
	}
}

function gatherComponents(xdNode, ctx) {
	if (xdNode instanceof xd.SymbolInstance) {
		let comp = new Component(xdNode);
		ctx.addComponentInstance(comp);
	}
	xdNode.children.forEach((child) => gatherComponents(child, ctx));
}

function detectImports(xdNode, ctx) {
	if (xdNode.blendMode && xdNode.blendMode !== "pass-through") {
		ctx.addImport("package:adobe_xd/blend_mask.dart", false);
	}
	if (xdNode instanceof xd.GraphicNode) {
		if (xdNode.fillEnabled && xdNode.fill && (xdNode.fill instanceof xd.RadialGradient)) {
			ctx.usesGradientXDTransform();
		}
	}
	if ((xdNode instanceof xd.Path)
		|| (xdNode instanceof xd.Line)
		|| (xdNode instanceof xd.Polygon)
		|| (xdNode instanceof xd.BooleanGroup)) {
		ctx.usesSVG();
	}
	if (xdNode instanceof xd.RepeatGrid) {
		ctx.addImport("package:adobe_xd/specific_rect_clip.dart", false);
	}

	if (NodeUtils.getProp(xd.root, PropType.ENABLE_PROTOTYPE) && xdNode.triggeredInteractions.length > 0) {
		ctx.addImport("package:adobe_xd/page_link.dart", false);
	}

	// Gather imports for components
	if (xdNode instanceof xd.SymbolInstance) {
		let master = ctx.masterComponents[xdNode.symbolId];
		if (master) { ctx.addImport(`./${master.widgetName}.dart`, true); }
		else { trace(`Didn't add import for component '${xdNode.name}' because the master was not found`); }
	}

	// Gather imports for interactions on nodes that reference other artboards
	for (let i = 0; i < xdNode.triggeredInteractions.length; ++i) {
		let action = xdNode.triggeredInteractions[i].action;
		if (action.type !== "goToArtboard") { continue; }
		let artboard = ctx.getArtboardFromXdNode(action.destination);
		if (artboard) { ctx.addImport(`./${artboard.widgetName}.dart`, true); }
		else { trace(`Didn't add import for destination artboard '${action.destination.name}' because it was not found. This is likely due to a duplicate name.`); }
	}
}

function parseScenegraphGroup(xdNode, ctx, mode) {
	// Container
	if (xdNode.mask) {
		ctx.log.warn("Group masks aren't supported.", xdNode);
	}
	let result = new Container(xdNode);
	parseChildren(xdNode, result, ctx, mode);
	return result;
}

function parseScenegraphNode(xdNode, ctx, mode, ignoreVisible=false) {
	if (!ignoreVisible && !xdNode.visible)
		// exclude from export.
		return null;

	let result = null;
	if (xdNode.constructor.name === "RootNode") {
		result = new RootNode(xdNode);
		parseChildren(xdNode, result, ctx, mode);
	} else if (xdNode instanceof xd.Artboard) {
		result = ctx.getArtboardFromXdNode(xdNode);
		if (!result) {
			ctx.log.note(`No component found for ${xdNode.name}.`);
			return null;
		}
		if (!result.children.length) {
			// Don't parse the artboard if it has already been parsed
			ctx.pushFile(result.widgetName);
			parseChildren(xdNode, result, ctx, mode);
			ctx.popFile();
			grabParameters(result, ctx);
		}
	} else if (xdNode instanceof xd.SymbolInstance) {
		if (mode === ParseMode.SYMBOLS_AS_GROUPS) {
			result = parseScenegraphGroup(xdNode, ctx, mode);
		} else {
			// Since components have already been parsed the added to the context in gatherComponents
			// we should not construct a new Component node here but instead grab it from that list
			result = ctx.getComponentFromXdNode(xdNode);
			if (!result) {
				ctx.log.note(`No component found for ${xdNode.name}.`);
				return null;
			}
			if (!result.children.length) {
				// Don't parse the component if it has already been parsed
				ctx.pushFile(result.widgetName);
				parseChildren(xdNode, result, ctx, mode);
				ctx.popFile();
				grabParameters(result, ctx);
			}
		}
	} else if (xdNode instanceof xd.Group) {
		result = parseScenegraphGroup(xdNode, ctx, mode);
	} else if (xdNode instanceof xd.Rectangle) {
		result = new Rectangle(xdNode);
	} else if (xdNode instanceof xd.Ellipse) {
		result = new Ellipse(xdNode);
	} else if (xdNode instanceof xd.Polygon) {
		result = new Path(xdNode);
	} else if (xdNode instanceof xd.Line) {
		result = new Path(xdNode);
	} else if (xdNode instanceof xd.Path) {
		result = new Path(xdNode);
	} else if (xdNode instanceof xd.BooleanGroup) {
		result = new Path(xdNode);
	} else if (xdNode instanceof xd.Text) {
		result = new Text(xdNode);
	} else if (xdNode instanceof xd.RepeatGrid) {
		result = new Grid(xdNode);
		if (xdNode.children.length > 0) {
			parseChildren(xdNode, result, ctx, ParseMode.SYMBOLS_AS_GROUPS);
			result.diff = diffNodes(xdNode.children.map((xdChild) => xdChild));
			grabParametersUsingDiff(result, ctx);
		} else {
			ctx.log.error('Repeat grid has no children.', xdNode);
		}
		result.childCount = xdNode.children.length;
	} else {
		trace('Unsupported node!');
		ctx.log.error(`Unsupported node ('${xdNode.constructor.name}').`, xdNode);
	}

	detectImports(xdNode, ctx)

	if (result) {
		if ((xdNode instanceof xd.GraphicNode) && xdNode.blur && xdNode.blur.visible) {
			if ((result instanceof Rectangle) || (result instanceof Ellipse)) {
				// NOTE: if Blur ever supports Path nodes, then it will need to be rewritten to use .children so that combineShapes can operate on it.
				if (xdNode.blur.isBackgroundEffect) {
					if (Math.round(xdNode.blur.brightnessAmount) !== 0) {
						ctx.log.warn("Brightness is currently not supported on blurs.", xdNode);
					}
					result = new BackgroundBlur(xdNode, result);
				} else {
					result = new ObjectBlur(xdNode, result);
				}
				ctx.usesUI();
			} else {
				ctx.log.warn('Blur is currently only supported on rectangles and ellipses.', xdNode);
			}
		}
		if (xdNode.blendMode && xdNode.blendMode !== 'pass-through') {
			result = new Blend(xdNode, result);
		}
	}

	return result;
}

function parseChildren(xdNode, result, ctx, mode) {
	for (let i = 0; i < xdNode.children.length; ++i) {
		let child = xdNode.children.at(i);
		let o = parseScenegraphNode(child, ctx, mode, false);
		if (o) result.children.push(o);
	}
}

function grabParametersFromChildren(node, child, ctx) {
	// Add all of our childrens parameters to our own and set the isOwn property on our
	// children's parameters to false
	if (child.parameters) {
		for (let paramRef of Object.values(child.parameters)) {
			let param = paramRef.parameter;
			if (paramRef.exportName) {
				if (node.childParameters[paramRef.name]) {
					// We have encountered duplicate parameter names, throw a warning
					ctx.log.warn(`Duplicate parameter: ${paramRef.name}.`, node.xdNode);
				}
				node.childParameters[paramRef.name] = new ParameterRef(param, true, paramRef.exportName);
				// The child should use this parameter not define it
				paramRef.isOwn = false;
			}
		}
	}
	// Don't grab parameters from the children of nodes with their own childParameters
	if (!child.childParameters && child.children)
		child.children.forEach((child) => grabParametersFromChildren(node, child, ctx));
}

function grabParametersFromChildrenUsingDiff(node, child, ctx, diffs, idx) {
	// TODO: CE: Merge this function with grabParametersFromChildren
	// Add all of our childrens parameters to our own and set the isOwn property on our
	// children's parameters to false
	let diff = diffs[idx];
	if (diff && child.parameters) {
		for (let paramRef of Object.values(child.parameters)) {
			let param = paramRef.parameter;
			if (diff[param.name]) {
				node.childParameters[paramRef.name] = new ParameterRef(param, true, paramRef.exportName);
				// The child should use this parameter not define it
				paramRef.isOwn = false;
			}
		}
	}
	// Don't grab parameters from the children of nodes with their own childParameters
	if (child.children)
		child.children.forEach((child, i) => grabParametersFromChildrenUsingDiff(node, child, ctx, diff ? diff.children : [], i));
}

function grabParameters(node, ctx) {
	node.children.forEach((child) => grabParametersFromChildren(node, child, ctx));
}

function grabParametersUsingDiff(node, ctx) {
	node.children.forEach((child) => grabParametersFromChildrenUsingDiff(node, child, ctx, [node.diff], 0));
}

function combineShapes(node, ctx, aggressive=false) {
	// Combines shapes into a single SVG output. In normal mode, it will only combine adjacent Path nodes.
	// In aggressive mode, it will combine Path, Rectangle, & Ellipse, and collapse groups that only contain those elements.
	if (!node || !node.children || node.children.length < 1 || node.hasCombinedShapes) { return; }
	let isFile = (node instanceof Artboard) || (node instanceof Component);
	if (isFile) { ctx.pushFile(node.widgetName); }
	// TODO: GS: This isn't a great solution. It works around Components being run through this method multiple times.
	node.hasCombinedShapes = true;

	let inGroup = _isGroup(node);
	let shape = null, kids = node.children;
	let maxCount = kids.length * 2; // TODO: GS: This is a temporary fail-safe, since infinite loops can take down XD.
	
	// This iterates one extra time with a null child to resolve the final shape:
	for (let i = 0; i <= kids.length; i++) {
		if (--maxCount < 0) { throw("infinite loop in combineShapes"); }

		let child = kids[i];
		if (child && child.children) {
			let aggressiveGroup = aggressive || NodeUtils.getProp(child.xdNode, PropType.COMBINE_SHAPES);
			combineShapes(child, ctx, aggressiveGroup);
			
			let onlyChild = child.children.length === 1 && child.children[0];
			if (aggressiveGroup && inGroup && child instanceof Container && onlyChild instanceof Shape && !Shape.hasInteraction(child)) {
				// the only child was a Shape, so we can strip the group and leave just the shape.
				// this is currently necessary despite the check below, because the id changes when the xdNode changes:
				ctx.removeShapeData(onlyChild);
				// set the shape's xdNode to the group, so it uses its transform:
				onlyChild.xdNode = child.xdNode;
				kids.splice(i, 1, onlyChild);
				child = onlyChild;
				// does not become the active shape because it has to be nested to retain transform.
			}
		}
		if (!shape && Shape.canAdd(child, aggressive)) {
			// start a new shape, the child will be added to it below.
			shape = new Shape(child.xdNode, i);
		}
		if (shape && shape.add(child, aggressive)) {
			// Added.
			if (child instanceof Shape) { ctx.removeShapeData(child) }
		} else if (shape) {
			// Not able to add the child to the current shape, so end it.
			ctx.addShapeData(shape);
			kids.splice(shape.index, shape.count, shape);
			i -= shape.count - 1;
			shape = null;
			// If the child can be added, then iterate over it again, so it starts a new shape.
			// This typically happens because it had interactivity.
			if (Shape.canAdd(child, aggressive)) { i--; continue; }
		}
	}
	if (isFile) { ctx.popFile(); }
}

function _isGroup(node) {
	return (node instanceof Artboard) || (node instanceof Component) || (node instanceof Container);
}

function parse(root, xdNodes, ctx) {
	// Grab components and artboard from the root nodes
	gatherArtboards(root, ctx);
	gatherComponents(root, ctx);

	// Parse components and artboard
	// TODO: CE: This widgets item needs to be ordered in order to get proper log filtering (maybe not it seems to be working)
	const widgets = Object.assign({}, ctx.artboards, ctx.masterComponents);
	// TODO: GS: We could do instance reference counting for components, and only export them if referenced, so that components that ONLY exist in hidden elements are not exported.
	for (let widget of Object.values(widgets)) {
		if (!xdNodes.length || xdNodes.findIndex((elem) => widget.xdNode === elem) !== -1) {
			// This widget exists in the list of items the user is exporting
			ctx.useUserLog();
		} else {
			// This widget must be parsed because it's state is needed but the user hasn't explicitly
			// requested to export this widget so filter the log messages
			ctx.useDebugLog();
		}
		const o = parseScenegraphNode(widget.xdNode, ctx, ParseMode.NORMAL, true);
		if (o != null) { combineShapes(o, ctx); }
	}
	ctx.useUserLog();

	// Parse the rest of the passed in nodes (ex. export selected, or copy selected)
	let results = [];
	for (let i = 0; i < xdNodes.length; ++i) {
		const xdNode = xdNodes[i];
		const o = parseScenegraphNode(xdNode, ctx, ParseMode.NORMAL, true);
		if (o != null) {
			combineShapes(o, ctx);
			results.push(o);
		}
	}
	// After this function is called no more modifications are all all
	//ctx.finish();
	return results;
}
exports.parse = parse;