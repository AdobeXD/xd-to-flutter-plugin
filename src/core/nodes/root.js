const utils = require("../utils");
const serialize = require("../serialize");

class RootNode {
	constructor(xdNode, config) {
		this.xdNode = xdNode;
		this.children = [];
	}

	toString(serializer, ctx) {
		ctx.log.error('RootNode.toString is unsupported.', null);
		return '';
	}

}

exports.RootNode = RootNode;
