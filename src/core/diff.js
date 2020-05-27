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
const { trace } = require('../utils/debug');

function isObject(value) {
	return typeof(value) === "object" && value !== null;
}

function objectCompare(a, b) {
	// Special case for image fills
	if ((a instanceof xd.ImageFill) && (b instanceof xd.ImageFill)) {
		return a.toString() == b.toString();
	} else if (isObject(a) && isObject(b)) {
		return JSON.stringify(a) === JSON.stringify(b);
	} else {
		return a === b;
	}
}

function diffValues(values) {
	let result = null;
	let master = values[0];
	for (let i = 0; i < values.length; ++i) {
		if (!objectCompare(master, values[i])) {
			result = values;
			break;
		}
	}
	return result;
}

function diffField(result, objects, field) {
	let fields = diffValues(objects.map((obj) => obj[field]));
	if (fields) result[field] = fields;
}

// Returns a node which contains
function diffNodes(xdNodes) {
	// Remove null nodes
	for (let i = 0; i < xdNodes.length;) {
		if (xdNodes[i] === null) {
			xdNodes.splice(i, 1);
		} else {
			++i;
		}
	}
	if (xdNodes.length < 1)
		return {};

	let result = {};
	result.children = [];
	let master = xdNodes[0];
	result._nodeType_ = master.constructor.name;
	// Return an empty result if the nodes are of a different type
	for (let i = 0; i < xdNodes.length; ++i) {
		if (xdNodes[i].constructor.name !== result._nodeType_) {
			return result;
		}
	}
	diffField(result, xdNodes, "visible");
	diffField(result, xdNodes, "opacity");
	diffField(result, xdNodes, "transform");
	diffField(result, xdNodes, "localBounds");
	diffField(result, xdNodes, "name");

	if (master instanceof xd.GraphicNode) {
		diffField(result, xdNodes, "fill");
		diffField(result, xdNodes, "fillEnabled");
		diffField(result, xdNodes, "stroke");
		diffField(result, xdNodes, "strokeEnabled");
		diffField(result, xdNodes, "strokeWidth");
		diffField(result, xdNodes, "strokePosition");
		diffField(result, xdNodes, "strokeEndCaps");
		diffField(result, xdNodes, "strokeJoins");
		diffField(result, xdNodes, "strokeMiterLimit");
		diffField(result, xdNodes, "strokeDashArray");
		diffField(result, xdNodes, "strokeDashOffset");
		diffField(result, xdNodes, "shadow");
		diffField(result, xdNodes, "blur");
		diffField(result, xdNodes, "pathData");
		if (master instanceof xd.Artboard) {
			diffField(result, xdNodes, "width");
			diffField(result, xdNodes, "height");
			diffField(result, xdNodes, "viewportHeight");
			diffField(result, xdNodes, "isHomeArtboard");
		} else if (master instanceof xd.Rectangle) {
			diffField(result, xdNodes, "width");
			diffField(result, xdNodes, "height");
			diffField(result, xdNodes, "cornerRadii");
			diffField(result, xdNodes, "hasRoundedCorners");
		} else if (master instanceof xd.Ellipse) {
			diffField(result, xdNodes, "radiusX");
			diffField(result, xdNodes, "radiusY");
			diffField(result, xdNodes, "isCircle");
		} else if (master instanceof xd.Polygon) {
			diffField(result, xdNodes, "width");
			diffField(result, xdNodes, "height");
			diffField(result, xdNodes, "cornerCount");
			diffField(result, xdNodes, "cornerRadii");
		} else if (master instanceof xd.Line) {
			diffField(result, xdNodes, "start");
			diffField(result, xdNodes, "end");
		} else if (master instanceof xd.Path) {
		} else if (master instanceof xd.BooleanGroup) {
			diffField(result, xdNodes, "pathOp");
		} else if (master instanceof xd.Text) {
			diffField(result, xdNodes, "text");
			diffField(result, xdNodes, "styleRanges");
			diffField(result, xdNodes, "fontFamily");
			diffField(result, xdNodes, "fontStyle");
			diffField(result, xdNodes, "fontSize");
			diffField(result, xdNodes, "charSpacing");
			diffField(result, xdNodes, "underline");
			diffField(result, xdNodes, "strikethrough");
			diffField(result, xdNodes, "textTransform");
			diffField(result, xdNodes, "textScript");
			diffField(result, xdNodes, "flipY");
			diffField(result, xdNodes, "textAlign");
			diffField(result, xdNodes, "lineSpacing");
			diffField(result, xdNodes, "paragraphSpacing");
			diffField(result, xdNodes, "areaBox");
			diffField(result, xdNodes, "clippedByArea");
		} else {
			// Error
		}
	} else if (master instanceof xd.Group) {
	} else if (master instanceof xd.SymbolInstance) {
		diffField(result, xdNodes, "symbolId");
		diffField(result, xdNodes, "isMaster");
	} else if (master instanceof xd.RepeatGrid) {
		diffField(result, xdNodes, "width");
		diffField(result, xdNodes, "height");
		diffField(result, xdNodes, "numColumns");
		diffField(result, xdNodes, "numRows");
		diffField(result, xdNodes, "paddingX");
		diffField(result, xdNodes, "paddingY");
		diffField(result, xdNodes, "cellSize");
	} else if (master instanceof xd.LinkedGraphic) {
	} else if (master instanceof xd.RootNode) {
	} else {
		// Error
	}
	master.children.forEach((child, i) => {
		result.children[i] = diffNodes(xdNodes.map((xdNode) => xdNode.children.at(i)));
	});

	return Object.freeze(result);
}
exports.diffNodes = diffNodes;

function getDiffByNodeType(diffs, type) {
	let result = null;
	if (diffs) {
		for (let i = 0; i < diffs.length; ++i) {
			let diff = diffs[i];
			if (diff && diff._nodeType_ === type) {
				result = diff;
				break;
			}
		}
	}
	return result;
}
exports.getDiffByNodeType = getDiffByNodeType;

function printDiff(diff, depth) {
	let d = depth || 0;
	let t = "";
	for (let i = 0; i < d; ++i)
		t += "  ";
	let values = Object.entries(diff);
	trace(`${t}node - ${diff._nodeType_}`);
	for (let [key, value] of values) {
		trace(`    ${t}${key}`, value);
	}
	diff.children.forEach((child) => {
		printDiff(child, d + 1);
	});
}
exports.printDiff = printDiff;

