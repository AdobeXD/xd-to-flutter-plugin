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
const { getImagePath } = require("../core/image_export");

exports.DartType = Object.freeze({
	BOOL: "bool",
	COLOR: "Color",
	IMAGE: "ImageProvider",
	STRING: "String",
	TAP_CB: "VoidCallback",
	BUILDER: "WidgetBuilder",
	GRID_DATA: "List<Map<String, dynamic>>"
});

function getColor(color, opacity=1.0) {
	if (color == null || opacity <= 0) { return "Colors.transparent"; }
	return "const Color(0x" + $.getARGBHexWithOpacity(color, opacity) + ")";
}
exports.getColor = getColor;


function getAssetImage(xdNode, ctx) {
	let path = getImagePath(xdNode);
	if (!path && ctx) { ctx.log.warn('Image does not have a Flutter image name.', xdNode); }
	return `const AssetImage('${path || ''}')`;
}
exports.getAssetImage = getAssetImage;

function getString(str) {
	return `'${$.escapeString(str)}'`;
}
exports.getString = getString;


function getGradientParam(fill, opacity) {
	let gradient = getGradient(fill, opacity);
	return gradient ? `gradient: ${gradient}, ` : '';
}
exports.getGradientParam = getGradientParam;

function getGradient(fill, opacity) {
	// Note: XD API docs say this should be called `LinearGradientFill`
	return fill instanceof xd.LinearGradient ? _getLinearGradient(fill, opacity) :
		   fill instanceof xd.RadialGradient ? _getRadialGradient(fill, opacity) :
			fill instanceof xd.AngularGradient ? _getSweepGradient(fill, opacity) :
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

function getScrollView(childStr, node, ctx) {
	return 'Scrollbar(child: SingleChildScrollView(' +
		_getScrollDirectionParam(node, ctx) +
		`child: ${childStr}, ` +
	'), )';
}
exports.getScrollView = getScrollView;

function getAlignment(x, y) {
	// XD uses 0 to 1, Flutter uses -1 to +1.
	return `Alignment(${$.fix(x*2-1, 3)}, ${$.fix(y*2-1, 3)})`;
}
exports.getAlignment = getAlignment;


function _getLinearGradient(fill, opacity=1) {
	return 'LinearGradient('+
		`begin: ${getAlignment(fill.startX, fill.startY)},` +
		`end: ${getAlignment(fill.endX, fill.endY)},` +
		_getColorsParam(fill.colorStops, opacity) +
	')';
}

function _getRadialGradient(fill, opacity=1) {
	// Flutter always draws relative to the shortest edge, whereas XD draws the gradient
	// stretched to the aspect ratio of its container.
	return 'RadialGradient('+
		`center: ${getAlignment(fill.startX, fill.startY)}, ` +
		(fill.startX === fill.endX && fill.startY === fill.endY ? '' :
			`focal: ${getAlignment(fill.endX, fill.endY)}, `) +
		(fill.startR === 0 ? '' : `focalRadius: ${$.fix(fill.startR, 3)}, `) +
		`radius: ${$.fix(fill.endR, 3)}, ` +
		_getColorsParam(fill.colorStops, opacity) +
		_getTransformParam(fill) +
	')';
}

function _getSweepGradient(fill, opacity=1) {
	// Flutter's SweepGradient always starts at 0 deg (right). `startAngle` only affects color placement.
	// Also, `transform` is multiplied against the `center`.
	// As such, we need to rotate & move the gradient via GradientXDTransform
	
	return 'SweepGradient('+
		`center: ${getAlignment(fill.startX, fill.startY)}, ` +
		`startAngle: 0.0, endAngle: ${$.fix(Math.PI*2, 4)}, ` +
		_getColorsParam(fill.colorStops, opacity) +
		_getTransformParam(fill, _getRotationMtx(fill.rotation / 180 * Math.PI)) +
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

function _getTransformParam(fill, mtx) {
	// The GradientXDTransform is needed even if there is no transformation in order to fix the aspect ratio.
	let o = mtx || fill.gradientTransform;
	return 'transform: GradientXDTransform(' +
		`${$.fix(o.a, 3)}, ${$.fix(o.b, 3)}, ${$.fix(o.c, 3)}, ` +
		`${$.fix(o.d, 3)}, ${$.fix(o.e, 3)}, ${$.fix(o.f, 3)}, ` +
		`${getAlignment(fill.startX, fill.startY)}), `;
}

function _getRotationMtx(r) {
	return {
		a: Math.cos(r), b: Math.sin(r), e: 0,
		c:-Math.sin(r), d: Math.cos(r), f: 0,
	}
}

function _getScrollDirectionParam(node, ctx) {
	let dir = node.xdNode.scrollingType;
	if (dir === xd.ScrollableGroup.PANNING) {
		ctx.log.warn("Panning scroll groups are not supported.", node.xdNode);
	}
	return dir === xd.ScrollableGroup.HORIZONTAL ? "scrollDirection: Axis.horizontal, " : "";
}