/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

// Serialization methods related to layout

const xd = require("scenegraph");
const $ = require("../../utils/utils");

function getPositionedNode(node, ctx) {
	if (node.responsive) { return _getPinnedNode(node, ctx); }
	return getTransformedNode(node, ctx)
}
exports.getPositionedNode = getPositionedNode;

function _getPinnedNode(node, ctx) {
	let xdNode = node && node.xdNode;
	if (!xdNode) { return ""; }
	let nodeString = node.serialize(ctx);
	if (!nodeString) { return ""; }

	// TODO: TEMPORARY:
	return getTransformedNode(node, ctx);

	let bounds = xdNode.boundsInParent, size = xdNode.parent.localBounds;

	return 'Pinned.fromSize(' +
		`bounds: Rectangle(${bounds.x}, ${bounds.y}, ${bounds.width}, ${bounds.height}, ), ` +
		`size: Size(${size.width}, ${size.height}), ` +

	')';
		
	// adjustTransform? rotation? Possibly wrap it in a transform?
	// need to disable all the fixed sizes on Text, Rect, Ellipse, etc.
	// add import.
}

// TODO: GS: evaluate rewriting this to wrap a string, instead of serializing the node internally.
function getTransformedNode(node, ctx) {
	let xdNode = node && node.xdNode;
	if (!xdNode) { return ""; }
	let nodeString = node.serialize(ctx);
	if (!nodeString) { return ""; }

	// For positioning the widget properly
	let transform = xdNode.transform;
	let lb = xdNode.localBounds;

	if (!(xdNode instanceof xd.Group)) { transform.translate(lb.x, lb.y); }

	// If the node wants to modify it's own transform do that here
	if (node.adjustTransform) { transform = node.adjustTransform(transform); }

	let str;
	if (transform.a !== 1.0 || transform.b !== 0.0 || transform.c !== 0.0 || transform.d !== 1.0) {
		// Full transform matrix
		// High precision for a-d, since rotation needs it.
		let a = $.fix(transform.a, 6);
		let b = $.fix(transform.b, 6);
		let c = $.fix(transform.c, 6);
		let d = $.fix(transform.d, 6);
		let e = $.fix(transform.e, 2);
		let f = $.fix(transform.f, 2);
		str = "Transform(" +
			`transform: Matrix4(` +
			`${a}, ${b}, 0.0, 0.0, ` +
			`${c}, ${d}, 0.0, 0.0, ` +
			`0.0, 0.0, 1.0, 0.0, ` +
			`${e}, ${f}, 0.0, 1.0), ` +
			`child: ${nodeString},` +
		")";
	} else if (transform.e !== 0 || transform.f !== 0) {
		// Only translation
		str = "Transform.translate(" +
			`offset: Offset(${$.fix(transform.e, 2)}, ${$.fix(transform.f, 2)}), ` +
			`child: ${nodeString},` +
		")";
	} else {
		// Don't transform
		str = nodeString;
	}

	return str;
}
exports.getTransformedNode = getTransformedNode;