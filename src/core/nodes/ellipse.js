const xd = require("scenegraph");
const $ = require("../utils");
const serialize = require("../serialize");
const NodeUtils = require("../nodeutils");
const PropType = require("../proptype");

const { Parameter, ParameterRef } = require("../parameter");

class Ellipse {
	constructor(xdNode) {
		this.xdNode = xdNode;
		this.parameters = {};

		let hasImageFill = (this.xdNode.fill instanceof xd.ImageFill);
		let fillParam = new Parameter(this, hasImageFill ? "ImageFill" : "Color", "fill", this.xdNode.fill);
		this.parameters["fill"] = new ParameterRef(fillParam, true,
			hasImageFill ? NodeUtils.getProp(this.xdNode, PropType.IMAGE_PARAM_NAME) : null);

		let strokeParam = new Parameter(this, "Color", "stroke", this.xdNode.stroke);
		this.parameters["stroke"] = new ParameterRef(strokeParam, true);

		let strokeEnableParam = new Parameter(this, "Boolean", "strokeEnabled", this.xdNode.strokeEnabled);
		this.parameters["strokeEnabled"] = new ParameterRef(strokeEnableParam, true);
	}

	toString(serializer, ctx) {
		let o = this.xdNode;
		let t = serializer.t;
		let str = `Container(width: ${$.fix(o.radiusX * 2)}, height: ${$.fix(o.radiusY * 2)}, ${serialize.getDecorationPropertyString(o, serializer, ctx, this.parameters)})`;
		return str;
	}

}
exports.Ellipse = Ellipse;
