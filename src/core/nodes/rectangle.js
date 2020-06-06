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

const $ = require("../../utils/utils");
const ExportUtils = require("../../utils/exportutils");
const NodeUtils = require("../../utils/nodeutils");

const { ExportNode } = require("./exportnode");
const PropType = require("../proptype");
const { ParamType } = require("../parameter");

class Rectangle extends ExportNode {
	static create(xdNode, ctx) {
		if (xdNode instanceof xd.Rectangle || xdNode instanceof xd.Ellipse) {
			if (xdNode.fillEnabled && xdNode.fill instanceof xd.RadialGradient) {
				ctx.usesGradientXDTransform();
			}
			return new Rectangle(xdNode, ctx);
		}
	}

	constructor(xdNode, ctx) {
		super(xdNode, ctx);

		if (xdNode.fill instanceof xd.ImageFill) {
			this.addParam(ParamType.IMAGE_FILL, "fill", xdNode.fill,
				NodeUtils.getProp(xdNode, PropType.IMAGE_PARAM_NAME));
		} else {
			this.addParam(ParamType.COLOR, "fill", xdNode.fill)
		}
		this.addParam(ParamType.COLOR, "stroke", xdNode.stroke);
		this.addParam(ParamType.BOOL, "strokeEnabled", xdNode.strokeEnabled);
	}

	_serialize(ctx) {
		let o = this.xdNode, isRect = o instanceof xd.Rectangle;
		let w = $.fix(isRect ? o.width : o.radiusX * 2);
		let h = $.fix(isRect ? o.height : o.radiusY * 2);
		let c = isRect ? _getColorOrDecorationParam(o, ctx, this.parameters) : 
			_getDecorationParam(o, ctx, this.parameters);
		return `Container(width: ${w}, height: ${h}, ${c})`;
	}

}
exports.Rectangle = Rectangle;


/** BOXDECORATION */
function _getColorOrDecorationParam(xdNode, ctx, parameters) {
	if (!xdNode.stroke && !xdNode.hasRoundedCorners && !xdNode.shadow && xdNode.fill instanceof xd.Color) {
		return _getFillParam(xdNode, ctx, parameters);
	} else {
		return _getDecorationParam(xdNode, ctx, parameters);
	}
}

function _getDecorationParam(o, ctx, parameters) {
	return `decoration: ${_getBoxDecoration(o, ctx, parameters)}, `;
}

function _getBoxDecoration(xdNode, ctx, parameters) {
	let str = $.getParamList([
		_getBorderRadiusParam(xdNode, ctx, parameters),
		_getFillParam(xdNode, ctx, parameters),
		_getBorderParam(xdNode, ctx, parameters),
		_getBoxShadowParam(xdNode, ctx, parameters)
	]);
	return "BoxDecoration(" + str + ")";
}

/** FILL & STROKE */
function _getFillParam(xdNode, ctx, parameters) {
	if (!xdNode.fillEnabled || !xdNode.fill) { return ""; }
	let fill = xdNode.fill, blur = xdNode.blur;
	let fillOpacityFromBlur = (blur && blur.visible && blur.isBackgroundEffect) ? blur.fillOpacity : 1.0;
	let opacity = NodeUtils.getOpacity(xdNode) * fillOpacityFromBlur;
	if (fill instanceof xd.Color) {
		let colorParameter = parameters["fill"].isOwn
			? ExportUtils.getColor(xdNode.fill, opacity)
			: parameters["fill"].name;
		return `color: ${colorParameter}, `;
	}
	if (fill instanceof xd.ImageFill) {
		let imageParam = parameters["fill"].isOwn
			? ExportUtils.getAssetImage(xdNode, ctx)
			: parameters["fill"].name;
		return "image: DecorationImage("+
			`  image: ${imageParam},` +
			`  fit: ${_getBoxFit(fill.scaleBehavior)},` +
			_getOpacityColorFilterParam(opacity) +
			"), ";
	}
	let gradient = ExportUtils.getGradientParam(fill, opacity);
	if (gradient) { return gradient; }
	ctx.log.warn(`Unrecognized fill type ('${fill.constructor.name}').`, xdNode);
}

function _getBoxFit(scaleBehavior, ctx) {
	return `BoxFit.${scaleBehavior === xd.ImageFill.SCALE_COVER ? 'cover' : 'fill'}`;
}

function _getOpacityColorFilterParam(opacity) {
	if (opacity >= 1) { return ''; }
	return `colorFilter: new ColorFilter.mode(Colors.black.withOpacity(${$.fix(opacity, 2)}), BlendMode.dstIn), `;
}

function _getBorderParam(xdNode, ctx, parameters) {
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
		? xdNode.stroke && ExportUtils.getColor(xdNode.stroke, NodeUtils.getOpacity(xdNode))
		: parameters["stroke"].name;
	if (!strokeParam) { return ""; }

	if (strokeEnableParamRef.isOwn) {
		if (!xdNode.strokeEnabled || !xdNode.stroke) { return ""; }
		return `border: Border.all(width: ${$.fix(xdNode.strokeWidth, 2)}, color: ${strokeParam}), `;
	} else {
		return `border: ${strokeEnableParam.name} ? Border.all(width: ${$.fix(xdNode.strokeWidth, 2)}, color: ${strokeParam}) : null, `;
	}
}


/** BORDERRADIUS */
function _getBorderRadiusParam(o, ctx) {
	let radiusStr;
	if (o instanceof xd.Ellipse) {
		radiusStr = _getBorderRadiusForEllipse(o, ctx);
	} else if (o.hasRoundedCorners) {
		radiusStr = _getBorderRadiusForRectangle(o, ctx);
	}
	return radiusStr ? `borderRadius: ${radiusStr}, ` : "";
}

function _getBorderRadiusForEllipse(o, ctx) {
	return `BorderRadius.all(Radius.elliptical(${$.fix(o.radiusX, 2)}, ${$.fix(o.radiusY, 2)}))`;
}

function _getBorderRadiusForRectangle(o, ctx) {
	let radii = o.cornerRadii;
	let tl = radii.topLeft, tr = radii.topRight, br = radii.bottomRight, bl = radii.bottomLeft;
	if (tl === tr && tl === br && tl === bl) {
		return `BorderRadius.circular(${$.fix(tl, 2)})`;
	} else {
		return 'BorderRadius.only(' +
			_getRadiusParam("topLeft", tl) +
			_getRadiusParam("topRight", tr) +
			_getRadiusParam("bottomRight", br) +
			_getRadiusParam("bottomLeft", bl) +
		')';
	}
}

function _getRadiusParam(param, value) {
	if (value <= 1) { return ''; }
	return `${param}: Radius.circular(${$.fix(value, 2)}), `;
}


/** SHADOWS */
function _getBoxShadowParam(xdNode, ctx) {
	let s = xdNode.shadow;
	if (!s || !s.visible) { return ""; }
	return "boxShadow: [BoxShadow(" +
		`color: ${ExportUtils.getColor(s.color, NodeUtils.getOpacity(xdNode))}, ` +
		`offset: Offset(${s.x}, ${s.y}), ` +
		`blurRadius: ${s.blur}, ` +
	"), ], ";
}