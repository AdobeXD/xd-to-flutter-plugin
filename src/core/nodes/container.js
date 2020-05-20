/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const NodeUtils = require("../../utils/nodeutils");
const PropType = require("../proptype");

const { Parameter, ParameterRef } = require("../parameter");
const { getChildList } = require("../serialize/lists");
const { getSizedGestureDetector } = require("../serialize/interactions");

// TODO: GS: Should this be renamed to "Stack" or "Group"?
class Container {
	constructor(xdNode) {
		this.xdNode = xdNode;
		this.children = [];
		this.parameters = {};

		let tapCbParam = new Parameter(this, "Function", "onTap", null);
		this.parameters["onTap"] = new ParameterRef(
			tapCbParam, true, NodeUtils.getProp(this.xdNode, PropType.TAP_CALLBACK_NAME));
	}

	toString(serializer, ctx) {
		if (!this.children.length)
			return "";

		let str = "Stack(children: <Widget>[";
		str += getChildList(this.children, serializer, ctx);
		if (this.parameters["onTap"].exportName) {
			let lx = this.xdNode.localBounds.x;
			let ly = this.xdNode.localBounds.y;
			let tapParam = this.parameters["onTap"];
			let gdStr = getSizedGestureDetector(
				this.xdNode, serializer, ctx, tapParam.name, tapParam.isOwn);
			if (gdStr)
				str += `Transform.translate(offset: Offset(${lx}, ${ly}), child: ${gdStr}, ),`;
		}
		str += "],)";

		return str;
	}

}

exports.Container = Container;
