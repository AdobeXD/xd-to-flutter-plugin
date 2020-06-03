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
const { getChildList } = require("../serialize/lists");
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

	// TODO: GS: this is identical to the implementation in Artboard. Merge?
	_getParamList(serializer, ctx) {
		// TODO: CE: Serialize own parameters
		// TODO: CE: There is a case currently where if the user passed parameter name
		// in this instance differs from the master this will break as the
		// parameter name won't match the serialized widget's parameter name.
		// This also applies to parameter types, if the types of the instances parameters
		// differ from the masters this will try an pass the wrong types (we only allow editing on master to fix the parameter name issue)
		let str = "", params = this.childParameters;
		for (let i=0; i<params.length; i++) {
			let ref = params[i], param = ref.parameter, value = param.value;
			if (!value) { continue; }
			str += `${ref.name}: ${serializer.serializeParameterValue(param.owner.xdNode, value, ctx)}, `;
		}
		return str;
	}
}

exports.Component = Component;
