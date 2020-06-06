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
const assets = require("assets");

const $ = require("./utils");
const { getOpacity } = require("./nodeutils");
const { getImagePath } = require("../core/image_export");

function getColor(color, opacity=1.0) {
	return "const Color(0x" + $.getARGBHexWithOpacity(color, opacity) + ")";
}
exports.getColor = getColor;


function getAssetImage(xdNode, serializer, ctx) {
	let path = getImagePath(xdNode);
	if (!path) { ctx.log.warn('Image does not have a Flutter image name.', xdNode); }
	return `const AssetImage('${path || ''}')`;
}
exports.getAssetImage = getAssetImage;


function getParamValue(xdNode, value, ctx) {
	if (value == null) { return null; } // do not use strict equality here.
	if (value instanceof xd.Color) { return getColor(value, getOpacity(xdNode)); }
	if (value instanceof xd.ImageFill) { return getAssetImage(xdNode, this, ctx); }
	if (typeof value === "string") { return `'${$.escapeString(value)}'`; }
	if (typeof value === "boolean") { return value ? "true" : "false"; }
	throw(`Unable to serialize '${value}' of type '${value.constructor.name}'.`);
}
exports.getParamValue = getParamValue;


function getGradientParam(fill, opacity) {
	let gradient = getGradient(fill, opacity);
	return gradient ? `gradient: ${gradient}, ` : '';
}
exports.getGradientParam = getGradientParam;

function getGradient(fill, opacity) {
	// Note: XD API docs say this should be called `LinearGradientFill`
	return fill instanceof xd.LinearGradient ? _getLinearGradient(fill, opacity) :
		   fill instanceof xd.RadialGradient ? _getRadialGradient(fill, opacity) :
		   '';
}
exports.getGradient = getGradient;

function getGradientFromAsset(xdColorAsset) {
	return `const ${getGradientTypeFromAsset(xdColorAsset)}(` +
		_getColorsParam(xdColorAsset.colorStops) +
	')';
}
exports.getGradientFromAsset = getGradientFromAsset;

function getGradientTypeFromAsset(xdColorAsset) {
	return xdColorAsset.gradientType === assets.RADIAL ? "RadialGradient" : "LinearGradient";
}
exports.getGradientTypeFromAsset = getGradientTypeFromAsset;


function _getLinearGradient(fill, opacity=1) {
	return 'LinearGradient('+
		`begin: ${_getAlignment(fill.startX, fill.startY)},` +
		`end: ${_getAlignment(fill.endX, fill.endY)},` +
		_getColorsParam(fill.colorStops, opacity) +
	')';
}

function _getRadialGradient(fill, opacity=1) {
	// RadialGradient is currently undocumented. It has the following properties:
	// startX/Y/R, endX/Y/R, colorStops, gradientTransform
	// XD currently does not seem to utilize endX/Y or startR, but basic support is included here.

	// Flutter always draws relative to the shortest edge, whereas XD draws the gradient
	// stretched to the aspect ratio of its container.
	return 'RadialGradient('+
		`center: ${_getAlignment(fill.startX, fill.startY)}, ` +
		(fill.startX === fill.endX && fill.startY === fill.endY ? '' :
			`focal: ${_getAlignment(fill.endX, fill.endY)}, `) +
		(fill.startR === 0 ? '' : `focalRadius: ${$.fix(fill.startR, 3)}, `) +
		`radius: ${$.fix(fill.endR, 3)}, ` +
		_getColorsParam(fill.colorStops, opacity) +
		_getTransformParam(fill) +
	')';
}

function _getColorsParam(arr, opacity) {
	let l = arr.length, stops = [], colors = [];
	for (let i=0; i<l; i++) {
		let s = arr[i];
		stops.push($.fix(s.stop, 3));
		colors.push(getColor(s.color, opacity));
	}
	return `colors: [${colors.join(", ")}], stops: [${stops.join(", ")}], `;
}

function _getTransformParam(fill) {
	// The GradientXDTransform is needed even if there is no transformation in order to fix the aspect ratio.
	let o = fill.gradientTransform;
	return 'transform: GradientXDTransform(' +
		`${$.fix(o.a, 3)}, ${$.fix(o.b, 3)}, ${$.fix(o.c, 3)}, ` +
		`${$.fix(o.d, 3)}, ${$.fix(o.e, 3)}, ${$.fix(o.f, 3)}, ` +
		`${_getAlignment(fill.startX, fill.startY)}), `;
}

function _getAlignment(x, y) {
	// XD uses 0 to 1, Flutter uses -1 to +1.
	return `Alignment(${$.fix(x*2-1, 2)}, ${$.fix(y*2-1, 2)})`;
}
