/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

// Serialization methods related to gradients

const xd = require("scenegraph");
const assets = require("assets");

const $ = require("../utils");
const { getColorWithOpacityString } = require("./colors");
const { getAlignmentString } = require("./layout.js");


function getGradient(fill, opacity) {
	// Note: XD API docs say this should be called `LinearGradientFill`
	return fill instanceof xd.LinearGradient ? _getLinearGradient(fill, opacity) :
		   fill instanceof xd.RadialGradient ? _getRadialGradient(fill, opacity) :
		   '';
}
exports.getGradient = getGradient;

function getGradientFromAsset(xdColorAsset) {
	return `const ${getGradientTypeFromAsset(xdColorAsset)}(` +
		_getGradientStops(xdColorAsset.colorStops) +
	')';
}
exports.getGradientFromAsset = getGradientFromAsset;

function getGradientTypeFromAsset(xdColorAsset) {
	return xdColorAsset.gradientType === assets.RADIAL ? "RadialGradient" : "LinearGradient";
}
exports.getGradientTypeFromAsset = getGradientTypeFromAsset;

function _getLinearGradient(fill, opacity=1) {
	return 'LinearGradient('+
		`begin: ${getAlignmentString(fill.startX, fill.startY)},` +
		`end: ${getAlignmentString(fill.endX, fill.endY)},` +
		_getGradientStops(fill.colorStops, opacity) +
	')';
}

function _getRadialGradient(fill, opacity=1) {
	// RadialGradient is currently undocumented. It has the following properties:
	// startX/Y/R, endX/Y/R, colorStops, gradientTransform
	// XD currently does not seem to utilize endX/Y or startR, but basic support is included here.

	// Flutter always draws relative to the shortest edge, whereas XD draws the gradient
	// stretched to the aspect ratio of its container.
	return 'RadialGradient('+
		`center: ${getAlignmentString(fill.startX, fill.startY)}, ` +
		(fill.startX === fill.endX && fill.startY === fill.endY ? '' :
			`focal: ${getAlignmentString(fill.endX, fill.endY)}, `) +
		(fill.startR === 0 ? '' : `focalRadius: ${$.fix(fill.startR, 3)}, `) +
		`radius: ${$.fix(fill.endR, 3)}, ` +
		_getGradientStops(fill.colorStops, opacity) +
		_getGradientXDTransform(fill) +
	')';
}

function _getGradientStops(arr, opacity) {
	let l = arr.length, stops = [], colors = [];
	for (let i=0; i<l; i++) {
		let s = arr[i];
		stops.push($.fix(s.stop, 3));
		colors.push(getColorWithOpacityString(s.color, opacity));
	}

	return `colors: [${colors.join(", ")}], stops: [${stops.join(", ")}], `;
}

function _getGradientXDTransform(fill) {
	// The GradientXDTransform is needed even if there is no transformation in order to fix the aspect ratio.
	let o = fill.gradientTransform;
	return 'transform: GradientXDTransform(' +
		`${$.fix(o.a, 3)}, ${$.fix(o.b, 3)}, ${$.fix(o.c, 3)}, ` +
		`${$.fix(o.d, 3)}, ${$.fix(o.e, 3)}, ${$.fix(o.f, 3)}, ` +
		`${getAlignmentString(fill.startX, fill.startY)}), `;
}
