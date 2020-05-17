/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

// Serialization methods related to Container BoxDecoration

const xd = require("scenegraph");

const $ = require("../utils");
const { getOpacity } = require("../nodeutils");
const { getColorWithOpacityString } = require("./colors");
const { getAssetImageString } = require("./core");
const { getBoxFitString } = require("./layout");
const { getGradient } = require("./gradients");

/** BOXDECORATION */
function getColorOrDecorationString(xdNode, serializer, ctx, parameters) {
	if (!xdNode.stroke && !xdNode.hasRoundedCorners && !xdNode.shadow && xdNode.fill instanceof xd.Color) {
		return _getFillPropertyString(xdNode, serializer, ctx, parameters);
	} else {
		return getDecorationPropertyString(xdNode, serializer, ctx, parameters);
	}
}
exports.getColorOrDecorationString = getColorOrDecorationString;

function getDecorationPropertyString(o, serializer, ctx, parameters) {
	return `decoration: ${_getBoxDecorationString(o, serializer, ctx, parameters)}, `;
}
exports.getDecorationPropertyString = getDecorationPropertyString;

function _getBoxDecorationString(xdNode, serializer, ctx, parameters) {
	let str = $.getParamList([
		_getBorderRadiusPropertyString(xdNode, serializer, ctx, parameters),
		_getFillPropertyString(xdNode, serializer, ctx, parameters),
		_getStrokePropertyString(xdNode, serializer, ctx, parameters),
		_getShadowPropertyString(xdNode, serializer, ctx, parameters)
	]);
	return "BoxDecoration(" + str + ")";
}

/** FILL & STROKE */
function _getFillPropertyString(xdNode, serializer, ctx, parameters) {
	if (!xdNode.fillEnabled || !xdNode.fill) { return ""; }
	let fill = xdNode.fill, blur = xdNode.blur;
	let fillOpacityFromBlur = (blur && blur.visible && blur.isBackgroundEffect) ? blur.fillOpacity : 1.0;
	let opacity = getOpacity(xdNode) * fillOpacityFromBlur;
	if (fill instanceof xd.Color) {
		let colorParameter = parameters["fill"].isOwn
			? getColorWithOpacityString(xdNode.fill, opacity)
			: parameters["fill"].name;
		return `color: ${colorParameter}`;
	}
	if (fill instanceof xd.ImageFill) {
		let imageParam = parameters["fill"].isOwn
			? getAssetImageString(xdNode, serializer, ctx)
			: parameters["fill"].name;
		return "image: DecorationImage("+
			`  image: ${imageParam},` +
			`  fit: ${getBoxFitString(fill.scaleBehavior)},` +
			_getOpacityColorFilter(opacity) +
			")";
	}
	let gradient = getGradient(fill, opacity);
	if (gradient) { return `gradient: ${gradient}`; }
	ctx.log.warn(`Unrecognized fill type ('${fill.constructor.name}').`, xdNode);
}

function _getOpacityColorFilter(opacity) {
	if (opacity >= 1) { return ''; }
	return `colorFilter: new ColorFilter.mode(Colors.black.withOpacity(${$.fix(opacity, 2)}), BlendMode.dstIn),`;
}

function _getStrokePropertyString(xdNode, serializer, ctx, parameters) {
	if (xdNode.strokePosition !== xd.GraphicNode.INNER_STROKE) {
		ctx.log.warn('Only inner strokes are supported on rectangles & ellipses.', xdNode);
	}
	if (xdNode.strokeJoins !== xd.GraphicNode.STROKE_JOIN_MITER) {
		ctx.log.warn('Only miter stroke joins are supported on rectangles & ellipses.', xdNode);
	}
	let dashes = xdNode.strokeDashArray;
	if (dashes && dashes.length && dashes.reduce((a, b) => a + b)) {
		ctx.log.warn('Dashed lines are not supported on rectangles & ellipses.', xdNode);
	}
	let strokeEnableParamRef = parameters["strokeEnabled"];
	let strokeEnableParam = strokeEnableParamRef.parameter;
	let strokeParam = parameters["stroke"].isOwn
		? xdNode.stroke && getColorWithOpacityString(xdNode.stroke, getOpacity(xdNode))
		: parameters["stroke"].name;
	if (!strokeParam)
		return "";

	if (strokeEnableParamRef.isOwn) {
		if (!xdNode.strokeEnabled || !xdNode.stroke) { return ""; }
		return `border: Border.all(width: ${$.fix(xdNode.strokeWidth, 2)}, color: ${strokeParam})`;
	} else {
		return `border: ${strokeEnableParam.name} ? Border.all(width: ${$.fix(xdNode.strokeWidth, 2)}, color: ${strokeParam}) : null`;
	}
}


/** BORDERRADIUS */
function _getBorderRadiusPropertyString(o, serializer, ctx) {
	let radiusStr;
	if (o instanceof xd.Ellipse) {
		radiusStr = _getEllipseBorderRadiusString(o, serializer, ctx);
	} else if (o.hasRoundedCorners) {
		radiusStr = _getRectangleBorderRadiusString(o, serializer, ctx);
	}
	if (radiusStr) {
		return `borderRadius: ${radiusStr}`;
	}
	return "";
}

function _getEllipseBorderRadiusString(o, serializer, ctx) {
	return `BorderRadius.all(Radius.elliptical(${$.fix(o.radiusX, 2)}, ${$.fix(o.radiusY, 2)}))`;
}

function _getRectangleBorderRadiusString(o, serializer, ctx) {
	let radii = o.cornerRadii;
	let tl = radii.topLeft, tr = radii.topRight, br = radii.bottomRight, bl = radii.bottomLeft;
	if (tl === tr && tl === br && tl === bl) {
		return `BorderRadius.circular(${$.fix(tl, 2)})`;
	} else {
		return 'BorderRadius.only(' +
			_getRadius("topLeft", tl) +
			_getRadius("topRight", tr) +
			_getRadius("bottomRight", br) +
			_getRadius("bottomLeft", bl) +
			')';
	}
}

function _getRadius(param, value) {
	if (value <= 1) { return ''; }
	return `${param}: Radius.circular(${$.fix(value, 2)}), `;
}


/** SHADOWS */
function _getShadowPropertyString(xdNode, serializer, ctx) {
	let s = xdNode.shadow;
	if (!s || !s.visible) { return ""; }
	return `boxShadow: [BoxShadow(color: ${getColorWithOpacityString(s.color, getOpacity(xdNode))}, offset: Offset(${s.x}, ${s.y}), blurRadius: ${s.blur},),]`;
}