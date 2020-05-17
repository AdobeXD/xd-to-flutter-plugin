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

const $ = require("../utils");
const NodeUtils = require("../nodeutils");
const PropType = require("../proptype");
const { getDecorationPropertyString } = require("../serialize/decorations");
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
		let w = $.fix(o.radiusX * 2), h = $.fix(o.radiusY * 2);
		let c = getDecorationPropertyString(o, serializer, ctx, this.parameters);
		return `Container(width: ${w}, height: ${h}, ${c})`;
	}

}
exports.Ellipse = Ellipse;
 