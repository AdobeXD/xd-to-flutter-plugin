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
				ctx.addImport("package:adobe_xd/gradient_xd_transform.dart");
			}
			return new Rectangle(xdNode, ctx);
		}
	}

	constructor(xdNode, ctx) {
		super(xdNode, ctx);

		if (xdNode.fill instanceof xd.ImageFill) {
			let value = ExportUtils.getAssetImage(xdNode, ctx);
			ctx.addParam(this.addParam("fill", NodeUtils.getProp(xdNode, PropType.IMAGE_PARAM_NAME), ExportUtils.DartType.IMAGE, value));
		}
	}

	_serialize(ctx) {
		let o = this.xdNode, isRect = o instanceof xd.Rectangle;
		let w = $.fix(isRect ? o.width : o.radiusX * 2);
		let h = $.fix(isRect ? o.height : o.radiusY * 2);
		let c = isRect ? this._getColorOrDecorationParam(ctx) : 
			this._getDecorationParam(ctx);
		return `Container(width: ${w}, height: ${h}, ${c})`;
	}

	/** BOXDECORATION */
	_getColorOrDecorationParam(ctx) {
		let xdNode = this.xdNode;
		if (!xdNode.stroke && !xdNode.hasRoundedCorners && !xdNode.shadow && xdNode.fill instanceof xd.Color) {
			return this._getFillParam(ctx);
		} else {
			return this._getDecorationParam(ctx);
		}
	}

	_getDecorationParam(ctx) {
		return `decoration: ${this._getBoxDecoration(ctx)}, `;
	}

	_getBoxDecoration(ctx) {
		let str = $.getParamList([
			this._getBorderRadiusParam(ctx),
			this._getFillParam(ctx),
			this._getBorderParam(ctx),
			this._getBoxShadowParam(ctx)
		]);
		return "BoxDecoration(" + str + ")";
	}

	/** FILL & STROKE */
	_getFillParam(ctx) {
		let xdNode = this.xdNode, fill = xdNode.fillEnabled && xdNode.fill;
		if (!fill) { return ""; }
		let blur = xdNode.blur;
		let blurFillOpacity = (blur && blur.visible && blur.isBackgroundEffect) ? blur.fillOpacity : 1.0;
		let opacity = NodeUtils.getOpacity(xdNode) * blurFillOpacity;
		if (fill instanceof xd.Color) {
			return `color: ${ExportUtils.getColor(xdNode.fill, opacity)}, `;
		}
		if (fill instanceof xd.ImageFill) {
			let image = this.getParamName("fill") || ExportUtils.getAssetImage(xdNode, ctx);
			return "image: DecorationImage("+
				`  image: ${image},` +
				`  fit: ${this._getBoxFit(fill.scaleBehavior)},` +
				this._getOpacityColorFilterParam(opacity) +
			"), ";
		}
		let gradient = ExportUtils.getGradientParam(fill, opacity);
		if (gradient) { return gradient; }
		ctx.log.warn(`Unrecognized fill type ('${fill.constructor.name}').`, xdNode);
	}

	_getBoxFit(scaleBehavior, ctx) {
		return `BoxFit.${scaleBehavior === xd.ImageFill.SCALE_COVER ? 'cover' : 'fill'}`;
	}

	_getOpacityColorFilterParam(opacity) {
		if (opacity >= 1) { return ''; }
		return `colorFilter: new ColorFilter.mode(Colors.black.withOpacity(${$.fix(opacity, 2)}), BlendMode.dstIn), `;
	}

	_getBorderParam(ctx) {
		let xdNode = this.xdNode;
		if (!xdNode.strokeEnabled) { return ""; }
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
		let color = xdNode.stroke && ExportUtils.getColor(xdNode.stroke, NodeUtils.getOpacity(xdNode));
		return color ? `border: Border.all(width: ${$.fix(xdNode.strokeWidth, 2)}, color: ${color}), ` : "";
	}

	/** BORDERRADIUS */
	_getBorderRadiusParam(ctx) {
		let xdNode = this.xdNode, radiusStr;
		if (xdNode instanceof xd.Ellipse) {
			radiusStr = this._getBorderRadiusForEllipse(ctx);
		} else if (xdNode.hasRoundedCorners) {
			radiusStr = this._getBorderRadiusForRectangle(ctx);
		}
		return radiusStr ? `borderRadius: ${radiusStr}, ` : "";
	}

	_getBorderRadiusForEllipse(ctx) {
		let o = this.xdNode;
		return `BorderRadius.all(Radius.elliptical(${$.fix(o.radiusX, 2)}, ${$.fix(o.radiusY, 2)}))`;
	}

	_getBorderRadiusForRectangle(ctx) {
		let radii = this.xdNode.cornerRadii;
		let tl = radii.topLeft, tr = radii.topRight, br = radii.bottomRight, bl = radii.bottomLeft;
		if (tl === tr && tl === br && tl === bl) {
			return `BorderRadius.circular(${$.fix(tl, 2)})`;
		} else {
			return 'BorderRadius.only(' +
				this._getRadiusParam("topLeft", tl) +
				this._getRadiusParam("topRight", tr) +
				this._getRadiusParam("bottomRight", br) +
				this._getRadiusParam("bottomLeft", bl) +
			')';
		}
	}

	_getRadiusParam(param, value) {
		if (value <= 1) { return ''; }
		return `${param}: Radius.circular(${$.fix(value, 2)}), `;
	}


	/** SHADOWS */
	_getBoxShadowParam(ctx) {
		let xdNode = this.xdNode, s = xdNode.shadow;
		if (!s || !s.visible) { return ""; }
		return "boxShadow: [BoxShadow(" +
			`color: ${ExportUtils.getColor(s.color, NodeUtils.getOpacity(xdNode))}, ` +
			`offset: Offset(${s.x}, ${s.y}), ` +
			`blurRadius: ${s.blur}, ` +
		"), ], ";
	}

}
exports.Rectangle = Rectangle;

