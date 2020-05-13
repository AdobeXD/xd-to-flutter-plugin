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
const serialize = require("../serialize");
const NodeUtils = require("../nodeutils");
const PropType = require("../proptype");

const { Parameter, ParameterRef } = require("../parameter");

class Rectangle {
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
		let w = $.fix(this.xdNode.width);
		let h = $.fix(this.xdNode.height);

		let c = serialize.getColorOrDecorationString(this.xdNode, serializer, ctx, this.parameters);
		let str = `Container(width: ${w}, height: ${h}, ${c})`;

		return str;
	}

}
exports.Rectangle = Rectangle;
