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
const { ContextTarget } = require("../context");
const { Parameter, ParameterRef, ParamType } = require("../parameter");
const { getChildList, getParamList } = require("../serialize/lists");
const { getSizedGestureDetector } = require("../serialize/interactions");

class Component extends ExportNode {
	static create(xdNode, ctx) { throw("Component.create() called."); }

	constructor(xdNode, ctx) {
		super(xdNode, ctx);
		this.children = [];
		this.childParameters = {};
		this.parameters = {};
		this.diff = null;

		// This currently doesn't use addParam, because the name doesn't match the key.
		let tapCbName = NodeUtils.getProp(this.xdNode, PropType.TAP_CALLBACK_NAME);
		let tapCbParam = new Parameter(this, ParamType.FUNCTION, "onTap", null);
		let tapCbParamRef = new ParameterRef(tapCbParam, false, tapCbName);
		this.childParameters["_componentOnTap_"] = tapCbParamRef;
	}

	get isMaster() {
		return this.xdNode.isMaster;
	}

	get symbolId() {
		return this.xdNode.symbolId;
	}

	get widgetName() {
		return NodeUtils.getWidgetName(this.xdNode);
	}

	// This currently bypasses the caching model in ExportRoot.
	// Also, _decorate is only applied to instances, not the widget class.
	serialize(serializer, ctx) {
		return this._serialize(serializer, ctx);
	}

	// This currently bypasses the caching model in ExportRoot.
	_serialize(serializer, ctx) {
		if (serializer.root == this) {
			// Widget class.
			let str = "Stack(children: <Widget>[";
			str += getChildList(this.children, serializer, ctx);
			if (this.childParameters["_componentOnTap_"].exportName) {
				let tapParam = this.childParameters["_componentOnTap_"];
				str += getSizedGestureDetector(
					this.xdNode, serializer, ctx, tapParam.name, tapParam.isOwn) + ",";
			}
			str += "],)";
			return str;
		} else {
			// Instance.
			let master = ctx.masterComponents[this.symbolId];
			if (!master) {
				ctx.log.error('Master component could not be found.', this.xdNode);
				return "Container()";
			}
			if (ctx.target === ContextTarget.CLIPBOARD) {
				ctx.log.warn(`Component widget ${master.widgetName} not exported during copy to clipboard operation.`, null);
			}
			let nodeStr = `${master.widgetName}(${this._getParamList(serializer, ctx)})`;
			return this._decorate(nodeStr, serializer, ctx);
		}
	}

}

exports.Component = Component;
