/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const $ = require("../../utils/utils");
const { NodeDecorator } = require("./nodedecorator");
const nodetype = require("../nodetype");

class Comment extends NodeDecorator {
	static create(node, ctx) {
		if (!node.xdNode.hasDefaultName) {
			return new Comment(node, ctx, true);
		}
	}

	_serialize(nodeStr, ctx) {
		let xdNode = this.node.xdNode;
		let name = $.shorten(xdNode.name, 20), type = nodetype.getXDLabel(xdNode);
		return `\n // Adobe XD layer: '${name}' (${type})\n${nodeStr}`;
	}
}
exports.Comment = Comment;