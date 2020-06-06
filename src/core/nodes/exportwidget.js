/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/


const { trace } = require("../../utils/debug");
const NodeUtils = require("../../utils/nodeutils");
const { ExportNode } = require("./exportnode");

// Abstract class representing the minimum interface required for an export node.
class ExportWidget extends ExportNode {
	// NodeDecorators should also have a static `create(xdNode, ctx)` method
	// that returns an instance if appropriate for the xdNode.

	constructor(xdNode, ctx) {
		super(xdNode, ctx);
		this.children = [];
		this.childParameters = {};
		this.parameters = {};
	}

	get symbolId() {
		return this.xdNode.symbolId;
	}

	get widgetName() {
		return NodeUtils.getWidgetName(this.xdNode);
	}

	serialize(serializer, ctx) {
		// bypass cache & decorate
		return this._serialize(serializer, ctx);
	}

	_getParamList(serializer, ctx) {
		// TODO: CE: Serialize own parameters
		// TODO: CE: There is a case currently where if the user passed parameter name
		// in this instance differs from the master this will break as the
		// parameter name won't match the serialized widget's parameter name.
		// This also applies to parameter types, if the types of the instances parameters
		// differ from the masters this will try an pass the wrong types (we only allow editing on master to fix the parameter name issue)
		let str = "", params = this.childParameters;
		for (let n in params) {
			let ref = params[n], param = ref.parameter, value = param.value;
			if (!value) { continue; }
			str += `${ref.name}: ${serializer.serializeParameterValue(param.owner.xdNode, value, ctx)}, `;
		}
		return str;
	}
}
exports.ExportWidget = ExportWidget;


