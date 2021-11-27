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
const { cleanFileName } = require("../utils/nameutils");
const PropType = require("./proptype");
const { getXDLabel } = require("./nodetype");
const { trace } = require('../utils/debug');
const { ParameterRef } = require("./parameter");

const { Artboard } = require("./nodes/artboard");
const { Group } = require("./nodes/group");
const { Container } = require("./nodes/container");
const { Text } = require("./nodes/text");
const { Component } = require("./nodes/component");
const { Path } = require("./nodes/path");
const { Grid } = require("./nodes/grid");

const { Shape } = require("./nodes/shape");
const { Blur } = require("./decorators/blur");
const { Blend } = require("./decorators/blend");
const { OnTap } = require("./decorators/ontap");
const { PrototypeInteraction } = require("./decorators/prototypeinteraction");
const { Comment } = require("./decorators/comment");
const { LayoutType } = require("../utils/layoututils");

const ParseMode = Object.freeze({
	NORMAL : 0,
	SYMBOLS_AS_GROUPS : 1,
});


function parse(root, targetXdNode, ctx) {
	// set initial properties:
	Comment.enabled = !!NodeUtils.getProp(xd.root, PropType.INCLUDE_NAME_COMMENTS);

	// Grab components and artboard from the root nodes
	gatherWidgets(root, ctx);

	// Parse components and artboard
	const widgets = Object.assign({}, ctx.artboards, ctx.masterComponents);
	for (let widget of Object.values(widgets)) {
		if (!targetXdNode || widget.xdNode === targetXdNode) {
			// This widget is being exported by the user
			ctx.useUserLog();
		} else {
			// This widget must be parsed because it's state is needed but the user hasn't explicitly
			// requested to export this widget so filter the log messages
			ctx.useDebugLog();
		}
		let o = parseScenegraphNode(widget.xdNode, ctx, ParseMode.NORMAL, true);
		combineShapes(o, ctx);
	}
	ctx.useUserLog();

	if (!targetXdNode) { return null; }

	let node = parseScenegraphNode(targetXdNode, ctx, ParseMode.NORMAL, true);
	if (node instanceof Path) { node = Shape.fromPath(node, ctx); }
	else { combineShapes(node, ctx); }

	return node;
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
	Grid, Path, Container, Group, Text, // instantiated via .create
	// Artboard, Component, Shape are special cases.
]
let DECORATOR_FACTORIES = [ // order determines nesting order, first will be innermost
	PrototypeInteraction, OnTap, Blur, Blend, Comment, // instantiated via .create
	// Layout is a special case.
]

function parseScenegraphNode(xdNode, ctx, mode, ignoreVisible=false) {
	if (!ignoreVisible && !xdNode.visible) { return null; }

	let node = null, isWidget = false;
	let isArtboard = xdNode instanceof xd.Artboard, isComponent = xdNode instanceof xd.SymbolInstance;
	
	if (xdNode instanceof xd.RootNode) {
		throw("parseScenegraphNode() run on RootNode");
	} else if (isComponent && mode === ParseMode.SYMBOLS_AS_GROUPS) {
		node = new Group(xdNode, ctx);
	} else if (isArtboard || isComponent) {
		node = isArtboard ? ctx.getArtboardFromXdNode(xdNode) : ctx.getComponentFromXdNode(xdNode);
		if (node) {
			if (node.parsed) { return node; }
			if (node.layout.type == LayoutType.PINNED) {
				// since components can be parsed out of order
				ctx.usesPinned();
			}
			node.parsed = isWidget = true;
		}
	} else {
		for (let i=0; i<NODE_FACTORIES.length && !node; i++) {
			node = NODE_FACTORIES[i].create(xdNode, ctx);
		}
	}
	if (!node) {
		ctx.log.error(`Unable to create export node from ${getXDLabel(xdNode)} named '${xdNode.constructor.name}'.`, xdNode);
		return null;
	}

	// post processing:
	if (isWidget) {
		ctx.pushWidget(node);
		parseChildren(node, ctx, mode);
		ctx.popWidget();
	} else if (node instanceof Group) {
		parseChildren(node, ctx, mode);
	} else if (node instanceof Grid) {
		if (ctx.inGrid) {
			ctx.log.warn("Nested repeat grids are currently unsupported, and may result in unexpected behaviour.", xdNode);
		}
		let kids = node.xdNode.children, child = kids && kids.at(0);
		ctx.pushGrid();
		node.item = child && parseScenegraphNode(child, ctx, ParseMode.SYMBOLS_AS_GROUPS);
		ctx.popGrid();
		combineShapes(node.item, ctx);
	}

	addWidgetImports(node, ctx);

	// add decorators:
	for (let i=0; i<DECORATOR_FACTORIES.length; i++) {
		let decorator = DECORATOR_FACTORIES[i].create(node, ctx);
		if (decorator) { node.addDecorator(decorator); }
	}
	return node;
}

function parseChildren(node, ctx, mode) {
	let xdNodes = node.xdNode.children;
	for (let i = 0; i < xdNodes.length; ++i) {
		node.children.push(parseScenegraphNode(xdNodes.at(i), ctx, mode, false));
	}
}

function addWidgetImports(node, ctx) {
	let xdNode = node.xdNode, fixCase = !!NodeUtils.getProp(xd.root, PropType.NORMALIZE_NAME_CASE);

	// Gather imports for components
	if (xdNode instanceof xd.SymbolInstance) {
		let master = ctx.masterComponents[xdNode.symbolId];
		if (master) { ctx.addImport(`./${cleanFileName(master.widgetName, fixCase)}.dart`, true); }
		else { trace(`Didn't add import for component '${xdNode.name}' because the master was not found`); }
	}

	// Gather imports for interactions on nodes that reference other artboards
	let l = NodeUtils.getInteractionCount(xdNode);
	for (let i = 0; i < l; ++i) {
		let action = xdNode.triggeredInteractions[i].action;
		if (action.type !== "goToArtboard") { continue; }
		let artboard = ctx.getArtboardFromXdNode(action.destination);
		if (artboard) { ctx.addImport(`./${cleanFileName(artboard.widgetName, fixCase)}.dart`, true); }
		else { trace(`Didn't add import for destination artboard '${action.destination.name}' because it was not found. This is likely due to a duplicate name.`); }
	}
}

function combineShapes(node, ctx, aggressive=false) {

	// Combines shapes into a single SVG output. In normal mode, it will only combine adjacent Path nodes.
	// In aggressive mode, it will combine Path & Container, and collapse groups that only contain those elements.
	if (!node || !node.children || node.children.length < 1 || node.hasCombinedShapes) { return; }
	node.hasCombinedShapes = true;
	let isFile = (node instanceof Artboard) || (node instanceof Component);
	if (isFile) { ctx.pushWidget(node); }

	let inGroup = (node instanceof Artboard) || (node instanceof Component) || (node instanceof Group);
	let shapeIndex, shape = null, kids = node.children;
	let maxCount = kids.length * 2; // TODO: GS: This is a temporary fail-safe, since infinite loops can take down XD.
	
	// This iterates one extra time with a null child to resolve the final shape:
	for (let i = 0; i <= kids.length; i++) {
		if (--maxCount < 0) { throw("infinite loop in combineShapes"); }

		let child = kids[i];
		if (child && child.children) {
			let aggressiveGroup = aggressive || NodeUtils.getProp(child.xdNode, PropType.COMBINE_SHAPES);
			combineShapes(child, ctx, aggressiveGroup);
			
			let onlyChild = child.children.length === 1 && child.children[0];
			if (aggressiveGroup && inGroup && child instanceof Group && onlyChild instanceof Shape && !Shape.hasInteraction(child)) {
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
			shape = new Shape(child.xdNode, ctx);
			shapeIndex = i;
		}
		if (shape && shape.add(child, aggressive)) {
			// Added.
			if (child instanceof Shape) { ctx.removeShapeData(child) }
		} else if (shape) {
			// Not able to add the child to the current shape, so end it.
			ctx.addShapeData(shape);
			kids.splice(shapeIndex, shape.count, shape);
			i -= shape.count - 1;
			shape = null;
			// If the child can be added, then iterate over it again, so it starts a new shape.
			// This typically happens because it had interactivity.
			if (Shape.canAdd(child, aggressive)) { i--; continue; }
		}
	}
	if (isFile) { ctx.popWidget(); }
}
