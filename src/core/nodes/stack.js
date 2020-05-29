/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const { ExportNode } = require("./exportnode");
const NodeUtils = require("../../utils/nodeutils");
const PropType = require("../proptype");

const { ParamType } = require("../parameter");
const { getChildList } = require("../serialize/lists");
const { getSizedGestureDetector } = require("../serialize/interactions");

// TODO: GS: Naming this Stack seems a little too implementation specific, but it prevents name collisions with xd.Group
class Stack extends ExportNode {
	constructor(xdNode) {
		super(xdNode);
		this.children = [];
		
		this.addParam(ParamType.FUNCTION, "onTap", null, NodeUtils.getProp(this.xdNode, PropType.TAP_CALLBACK_NAME));
	}

	_serialize(serializer, ctx) {
		if (!this.hasChildren) { return ""; }

		let str = "Stack(children: <Widget>[";
		str += getChildList(this.children, serializer, ctx);
		let tapParam = this.getParam("onTap");
		if (tapParam.exportName) {
			let gdStr = getSizedGestureDetector(this.xdNode, serializer, ctx, tapParam.name, tapParam.isOwn);
			if (gdStr) {
				let bounds = this.xdNode.localBounds, lx = bounds.x, ly = bounds.y;
				str += `Transform.translate(offset: Offset(${lx}, ${ly}), child: ${gdStr}, ),`;
			}
		}
		str += "],)";

		return str;
	}

}
exports.Stack = Stack;
