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
const { trace } = require('../utils/debug');
const { diffGridNodes } = require("./diff");
const { ParameterRef } = require("./parameter");

const { Artboard } = require("./nodes/artboard");
const { Stack } = require("./nodes/stack");
const { Rectangle } = require("./nodes/rectangle");
const { Text } = require("./nodes/text");
const { Component } = require("./nodes/component");
const { Path } = require("./nodes/path");
const { Grid } = require("./nodes/grid");

const { Shape } = require("./nodes/shape");
const { Blur } = require("./decorators/blur");
const { Blend } = require("./decorators/blend");
const { OnTap } = require("./decorators/ontap");
const { PrototypeInteraction } = require("./decorators/prototypeinteraction");
const { Layout } = require("./decorators/layout");
const { Comment } = require("./decorators/comment");

const ParseMode = Object.freeze({
	NORMAL : 0,
	SYMBOLS_AS_GROUPS : 1,
});


function parse(root, xdNodes, ctx) {
	// Grab components and artboard from the root nodes
	gatherWidgets(root, ctx);

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
	// After this function is called no more modifications are allowed
	//ctx.finish();
	return results;
}
exports.parse = parse;

function gatherWidgets(xdNode, ctx) {
	if (xdNode instanceof xd.SymbolInstance) {
		ctx.addComponentInstance(new Component(xdNode, ctx));
	} else if (xdNode instanceof xd.Artboard) {
		ctx.addArtboard(new Artboard(xdNode, ctx));
	}
	if (xdNode.children) { xdNode.children.forEach((o) => gatherWidgets(o, ctx)); }
}

let NODE_FACTORIES = [
	Grid, Path, Rectangle, Stack, Text, // instantiated via .create
	// Artboard, Component, Shape are special cases.
]
let DECORATOR_FACTORIES = [ // order determines nesting order, first will be innermost
	PrototypeInteraction, OnTap, Blur, Blend, Layout, Comment, // instantiated via .create
]

function parseScenegraphNode(xdNode, ctx, mode, ignoreVisible=false) {
	if (!ignoreVisible && !xdNode.visible) { return null; }

	let node = null, isWidget = false;
	
	// special cases:
	if (xdNode instanceof xd.RootNode) {
		throw("parseScenegraphNode() run on RootNode");
	} else if (xdNode instanceof xd.Artboard) {
		node = ctx.getArtboardFromXdNode(xdNode);
		isWidget = true;
	} else if (xdNode instanceof xd.SymbolInstance) {
		if (mode === ParseMode.SYMBOLS_AS_GROUPS) {
			node = new Stack(xdNode, ctx);
		} else {
			node = ctx.getComponentFromXdNode(xdNode);
			if (node.parsed) { return node; }
			node.parsed = isWidget = true;
		}
	} else {
		for (let i=0; i<NODE_FACTORIES.length && !node; i++) {
			node = NODE_FACTORIES[i].create(xdNode, ctx);
		}
	}
	if (!node) {
		ctx.log.error(`Unable to create export node ('${xdNode.constructor.name}').`, xdNode);
		return null;
	}

	// post processing:
	if (isWidget) {
		ctx.pushFile(node.widgetName);
		parseChildren(node, ctx, mode);
		ctx.popFile();
		grabParameters(node, ctx);
	} else if (node instanceof Stack) {
		parseChildren(node, ctx, mode);
	} else if (node instanceof Grid) {
		parseChildren(node, ctx, ParseMode.SYMBOLS_AS_GROUPS);
		node.diff = diffGridNodes(xdNode.children.map(o => o));
		grabParametersUsingDiff(node, ctx);
	}

	detectImports(node, ctx);

	// add decorators:
	for (let i=0; i<DECORATOR_FACTORIES.length; i++) {
		let decorator = DECORATOR_FACTORIES[i].create(node, ctx);
		if (decorator) { node.addDecorator(decorator); }
	}
	return node;
}

function parseChildren(node, ctx, mode) {
	let xdNode = node.xdNode;
	for (let i = 0; i < xdNode.children.length; ++i) {
		let child = xdNode.children.at(i);
		let o = parseScenegraphNode(child, ctx, mode, false);
		if (o) { node.children.push(o); }
	}
}

function detectImports(node, ctx) {
	let xdNode = node.xdNode;

	if (NodeUtils.getProp(xd.root, PropType.ENABLE_PROTOTYPE) && xdNode.triggeredInteractions.length > 0) {
		ctx.addImport("package:adobe_xd/page_link.dart");
	}

	// Gather imports for components
	if (xdNode instanceof xd.SymbolInstance) {
		// TODO: GS: Can this be moved into Component? It causes issues because components are instantiated before being added.
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

function grabParameters(node, ctx) {
	node.children.forEach((child) => grabParametersFromChildren(node, child, ctx));
}

function grabParametersUsingDiff(node, ctx) {
	node.children.forEach((child) => grabParametersFromChildrenUsingDiff(node, child, ctx, [node.diff], 0));
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

function combineShapes(node, ctx, aggressive=false) {
	// Combines shapes into a single SVG output. In normal mode, it will only combine adjacent Path nodes.
	// In aggressive mode, it will combine Path, Rectangle, & Ellipse, and collapse groups that only contain those elements.
	if (!node || !node.children || node.children.length < 1 || node.hasCombinedShapes) { return; }
	let isFile = (node instanceof Artboard) || (node instanceof Component);
	if (isFile) { ctx.pushFile(node.widgetName); }
	// TODO: GS: This isn't a great solution. It works around Components being run through this method multiple times.
	node.hasCombinedShapes = true;

	let inGroup = (node instanceof Artboard) || (node instanceof Component) || (node instanceof Stack);
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
			if (aggressiveGroup && inGroup && child instanceof Stack && onlyChild instanceof Shape && !Shape.hasInteraction(child)) {
				// the only child was a Shape, so we can strip the group and leave just the shape.
				// this is currently necessary despite the check below, because the id changes when the xdNode changes:
				ctx.removeShapeData(onlyChild);
				// set the shape's xdNode to the group, so it uses its transform:
				onlyChild.xdNode = child.xdNode;
				// similarly copy the group's decorators onto the child:
				// TODO: GS: test this with a blend on the child & on the group.
				onlyChild.decorators = child.decorators;
				kids.splice(i, 1, onlyChild);
				child = onlyChild;
				// does not become the active shape because it has to be nested to retain transform.
			}
		}
		if (!shape && Shape.canAdd(child, aggressive)) {
			// start a new shape, the child will be added to it below.
			shape = new Shape(child.xdNode, ctx, i);
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
