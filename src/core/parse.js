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

const utils = require("./utils");
const NodeUtils = require("./nodeutils");
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
const { Parameter, ParameterRef } = require("./parameter");

const { trace } = require('./trace');

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
		if (master)
			ctx.addImport(`./${master.widgetName}.dart`, true);
		else
			trace(`Didn't add import for component ${xdNode.name} because the master was not found`);
	}

	// Gather imports for interactions on nodes that reference other artboards
	for (let i = 0; i < xdNode.triggeredInteractions.length; ++i) {
		let interaction = xdNode.triggeredInteractions[i];
		switch (interaction.action.type) {
			case "goToArtboard":
				{
					let artboard = ctx.getArtboardFromXdNode(interaction.action.destination);
					ctx.addImport(`./${artboard.widgetName}.dart`, true);
				}
				break;
			default:
				break;
		}
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
		result.shapes.push(xdNode);
	} else if (xdNode instanceof xd.Line) {
		result = new Path(xdNode);
		result.shapes.push(xdNode);
	} else if (xdNode instanceof xd.Path) {
		result = new Path(xdNode);
		result.shapes.push(xdNode);
	} else if (xdNode instanceof xd.BooleanGroup) {
		result = new Path(xdNode);
		result.shapes.push(xdNode);
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
				if (xdNode.blur.brightnessAmount !== 0) {
					ctx.log.warn("Brightness is currently not supported on blurs.", xdNode);
				}
				// NOTE: CE: If this ever gets refractored to wrap a Path node in a blur the blur object
				// must have a `children` member for shape collapsing to work
				if (xdNode.blur.isBackgroundEffect) {
					result = new BackgroundBlur(xdNode, result);
				} else {
					result = new ObjectBlur(xdNode, result);
				}
			} else {
				ctx.log.warn('Background blur is currently only supported on rectangles and ellipses.', xdNode);
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

function buildDiffs(ctx) {
	for (let instances of Object.values(ctx.componentInstances)) {
		let diff = diffNodes(instances.map((node) => node.xdNode));
		if (diff) {
			for (let instance of instances) {
				instance.diff = diff;
			}
		}
	}
}

function grabParameters(node, ctx) {
	node.children.forEach((child) => grabParametersFromChildren(node, child, ctx));
}

function grabParametersUsingDiff(node, ctx) {
	node.children.forEach((child) => grabParametersFromChildrenUsingDiff(node, child, ctx, [node.diff], 0));
}

function collapseShapes(node, shape, ctx) {
	if (!node.children)
		return;

	if ((node instanceof Artboard) || (node instanceof Component)) {
		ctx.pushFile(node.widgetName);
	}

	for (let i = 0; i < node.children.length;) {
		let child = node.children[i];

		if (NodeUtils.getProp(xd.root, PropType.ENABLE_PROTOTYPE) && child.xdNode.triggeredInteractions.length) {
			if (child instanceof Path) {
				ctx.addShapeData(child);
			}
			collapseShapes(child, shape, ctx);
			++i;
		} else {
			if (child instanceof Path) {
				if (shape) {
					shape.shapes.push(child.xdNode);
					// Remove the path node as the first one will handle the export of it's shape
					node.children.splice(i, 1);
				} else {
					shape = child;
					ctx.addShapeData(shape);
					++i;
				}
			} else if (child instanceof Container) {
				const p = new Path(child.xdNode);
				collapseShapes(child, p, ctx);
				if (p.shapes.length > 0) {
					if (shape) {
						shape.shapes.push(p);
					} else {
						shape = new Path(child.xdNode);
						shape.shapes.push(p);
						ctx.addShapeData(shape);
						node.children.splice(i, 0, shape);
						++i;
					}
				}
				++i;
			} else {
				shape = null;
				collapseShapes(child, shape, ctx);
				++i;
			}
		}
	}

	if ((node instanceof Artboard) || (node instanceof Component)) {
		ctx.popFile();
	}

	return shape;
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
		if (o != null) {
			collapseShapes(o, null, ctx);
		}
	}
	ctx.useUserLog();

	// Parse the rest of the passed in widgets
	let results = [];
	for (let i = 0; i < xdNodes.length; ++i) {
		const xdNode = xdNodes[i];
		const o = parseScenegraphNode(xdNode, ctx, ParseMode.NORMAL, true);
		if (o != null) {
			collapseShapes(o, null, ctx);
			results.push(o);
		}
	}
	// After this function is called no more modifications are all all
	//ctx.finish();
	return results;
}
exports.parse = parse;

// For debugging:
function printParameters(n, depth) {
	let d = depth || 0;
	let t = "";
	for (let i = 0; i < d; ++i)
		t += "  ";
	trace(`${t}node - ${n.constructor.name}`);
	if (n.parameters) {
		let values = Object.entries(n.parameters);
		for (let [key, value] of values) {
			trace(`    ${t}${key}`);
			//trace(value);
		}
	}
	if (n.children) {
		n.children.forEach((child) => {
			printParameters(child, d + 1);
		});
	}
}

