/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const { AbstractDecorator } = require("./abstractdecorator");
const { Group } = require("../nodes/group");

class OnTap extends AbstractDecorator {
	static create(node, ctx) {
		if (!(node instanceof Group)) { return; }
		if (node.getParam("onTap")) {
			return new OnTap(node, ctx);
		}
	}

	_serialize(nodeStr, ctx) {
		return OnTap.get(nodeStr, this.node.getParam("onTap").name);
	}
}
exports.OnTap = OnTap;

OnTap.get = function(nodeStr, onTap) {
	// This is also used by Component._serialize()
	if (!nodeStr || !onTap) { return nodeStr; }
	return 'GestureDetector(' +
		`onTap: ()=> ${onTap}?.call(), ` +
		`child: ${nodeStr}, ` +
	')';
}