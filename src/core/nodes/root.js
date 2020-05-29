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

class RootNode extends ExportNode {
	constructor(xdNode) {
		super(xdNode);
		this.children = [];
	}

	_serialize(serializer, ctx) {
		throw("RootNode.serialize called. This should never happen.")
	}

}

exports.RootNode = RootNode;
