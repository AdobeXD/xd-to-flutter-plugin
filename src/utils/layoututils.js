/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

/*
This file comprises a number of helper functions for getting, translating
or normalizing XD API values related to layout or transformation.
*/

const $ = require("./utils");

function addSizedBox(nodeStr, size, ctx) {
	return `SizedBox(width: ${$.fix(size.width, 0)}, height: ${$.fix(size.height, 0)}, child: ${nodeStr},)`;
}
exports.addSizedBox = addSizedBox;

function getGroupContentBounds(xdNode, ctx) {
	// adjusts group bounds to account for inner padding.
	let b = xdNode.localBounds;
	let pad = normalizePadding(xdNode.layout.padding && xdNode.layout.padding.values);
	
	return !pad ? b : {
		x: b.x + pad.left,
		y: b.y + pad.top,
		width: b.width - pad.left - pad.right,
		height: b.height - pad.top - pad.bottom
	}
}
exports.getGroupContentBounds = getGroupContentBounds; 

function getAdjustedBounds(xdNode, ctx) {
	// finds the untransformed bounds within the parent, adjusting for parent padding and scrolling

	// Note: Artboards always return x/y=0 & w/h = specified size for localBounds, even if children exceed edges.
	let bip = xdNode.boundsInParent, lb = xdNode.localBounds;
	let parent = xdNode.parent, pb = parent.localBounds;

	// calculate the untransformed top left corner, by finding the center
	// and subtracting half the untransformed w & h:
	let x = bip.x + bip.width/2 - lb.width/2;
	let y = bip.y + bip.height/2 - lb.height/2;
	let b = {
		x: x - pb.x,
		y: y - pb.y,
		width: lb.width,
		height: lb.height,
	}

	// adjust for parent padding:
	let pad = normalizePadding(parent.layout.padding && parent.layout.padding.values);
	if (pad) {
		b.x -= pad.left;
		b.y -= pad.top;
	}

	// adjust for scrolling:
	let offset = getScrollOffset(xdNode.parent, ctx);
	if (offset) {
		b.x += offset.x;
		b.y += offset.y;
	}

	return b;
}
exports.getAdjustedBounds = getAdjustedBounds;

function getScrollOffset(xdNode, ctx) {
	let vp = xdNode.viewport;
	if (!vp) { return null; }
	return {x: vp.offsetX||0, y: vp.offsetY||0};
}
exports.getScrollOffset = getScrollOffset;

function normalizePadding(pad) {
	// XD padding can be a rect object or a single value
	// returns null if no padding, otherwise returns a rect object
	if (!pad) { return null; }
	if (isNaN(pad)) { return pad; } // already a rect
	return {top: pad, right: pad, bottom: pad, left: pad, homogenous: true}
}
exports.normalizePadding = normalizePadding;

function mergeBounds(xdNodes) {
	if (!xdNodes || xdNodes.length === 0) { return null; }
	let o = {l: null, t: null, b: null, r: null};
	xdNodes.forEach((node)=>{
		let bip = node.boundsInParent
		let l=bip.x, t=bip.y, r=l+bip.width, b=t+bip.height;
		if (o.l === null || l < o.l) { o.l = l; }
		if (o.t === null || t < o.t) { o.t = t; }
		if (o.r === null || r > o.r) { o.r = r; }
		if (o.b === null || b > o.b) { o.b = b; }
	});
	return {x: o.l, y: o.t, width: o.r-o.l, height: o.b-o.t};
}
exports.mergeBounds = mergeBounds;

function normalizeSpacings(spaces, length) {
	// XD spacing can be a list or a single value, this method always returns an Array
	// the value "arrays" XD returns aren't actually of type Array:
	if (spaces.map) { return spaces.map((o) => o); }
	if (spaces == null) { spaces = 0; }
	return Array(length).fill(spaces);
}
exports.normalizeSpacings = normalizeSpacings;

function hasComplexTransform(node, error, ctx) {
	let o = node.transform;
	if (!o.flipY && o.rotation % 360 === 0) { return false; }
	if (error && ctx) { ctx.log.warn(error, node.xdNode); }
	return true;
}
exports.hasComplexTransform = hasComplexTransform;