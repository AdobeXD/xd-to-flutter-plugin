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

function diffGridNodes(xdNodes) {
	if (xdNodes.length < 1) { return {}; }

	let result = {children: []}, master = xdNodes[0];
	
	// Currently in XD, only text content and image fills can be different in grid items.
	if (master instanceof xd.Text) {
		_diffField(result, xdNodes, "text");
	} else if ((master instanceof xd.Rectangle || master instanceof xd.Ellipse) && master.fill instanceof xd.ImageFill) {
		_diffField(result, xdNodes, "fill");
	}
	
	master.children.forEach((child, i) => {
		result.children[i] = diffGridNodes(xdNodes.map(o => o.children.at(i)));
	});
	
	return Object.freeze(result);
}
exports.diffGridNodes = diffGridNodes;

function _diffField(result, objects, field) {
	let a = objects[0][field];
	for (let i=1; i<objects.length; i++) {
		if (!_objectCompare(a, objects[i][field])) {
			result[field] = objects.map(o => o[field]);
			return;
		}
	}
}

function _objectCompare(a, b) {
	// Currently in XD, only text content, text color, and image fills can be different in grid items.
	if (a instanceof xd.ImageFill) {
		// there is no reliable way in XD to compare image fills, so we always need to diff them.
		// TODO: GS: if XD ever adds an imageHash (or similar), this should be updated.
		return false;
	} else if (a instanceof xd.Color) { // not used.
		return a.a === b.a && a.r === b.r && a.g === b.g && a.b === b.b;
	} else {
		return a === b;
	}
}

