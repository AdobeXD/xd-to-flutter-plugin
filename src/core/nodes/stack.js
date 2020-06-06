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

const { ExportNode } = require("./exportnode");
const NodeUtils = require("../../utils/nodeutils");
const PropType = require("../proptype");

const { ParamType } = require("../parameter");

// TODO: GS: Naming this Stack seems a little too implementation specific, but it prevents name collisions with xd.Group
class Stack extends ExportNode {
	static create(xdNode, ctx) {
		if (xdNode instanceof xd.Group) {
			return new Stack(xdNode, ctx);
		}
	}

	constructor(xdNode, ctx) {
		super(xdNode, ctx);
		this.children = [];
		
		this.addParam(ParamType.FUNCTION, "onTap", null, NodeUtils.getProp(this.xdNode, PropType.TAP_CALLBACK_NAME));
	}

	_serialize(ctx) {
		if (!this.hasChildren) { return ""; }

		let xdNode = this.xdNode;
		if (xdNode.mask) { ctx.log.warn("Group masks aren't supported.", xdNode); }

		return `Stack(children: <Widget>[${this._getChildList(this.children, ctx)}], )`;
	}

}
exports.Stack = Stack;
