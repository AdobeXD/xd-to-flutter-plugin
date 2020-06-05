/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const { NodeDecorator } = require("./nodedecorator");

class OnTap extends NodeDecorator {
	static create(node, ctx) {
		let param = node.getParam("onTap");
		if (param && param.exportName && param.isOwn) {
			return new OnTap(node, ctx);
		}
	}

	_serialize(nodeStr, serializer, ctx) {
		return 'GestureDetector(' +
			`onTap: ()=> ${this.node.getParam("onTap").exportName}?.call(), ` +
			`child: ${nodeStr}, ` +
		')';
	}
}
exports.OnTap = OnTap;