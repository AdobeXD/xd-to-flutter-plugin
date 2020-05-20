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

function getAlignment(x, y) {
	// XD uses 0 to 1, Flutter uses -1 to +1.
	return `Alignment(${$.fix(x*2-1, 2)}, ${$.fix(y*2-1, 2)})`;
}
exports.getAlignment = getAlignment;

function getBoxFit(scaleBehavior, serializer, ctx) {
	return `BoxFit.${scaleBehavior === xd.ImageFill.SCALE_COVER ? 'cover' : 'fill'}`;
}
exports.getBoxFit = getBoxFit;

// TODO: GS: evaluate rewriting this to wrap a string, instead of handling the getNodeString internally.
function getTransformedNode(node, serializer, ctx) {
	if (!node) { return ""; }
	let nodeString = serializer.getNodeString(node, ctx);
	if (!nodeString) { return ""; }

	// For positioning the widget properly
	let transform = node.xdNode.transform;
	let lb = node.xdNode.localBounds;

	if (!(node.xdNode instanceof xd.Group)) { transform.translate(lb.x, lb.y); }

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