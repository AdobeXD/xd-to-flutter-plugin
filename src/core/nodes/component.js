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
	constructor(xdNode) {
		super(xdNode);
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

	get id() {
		return this.xdNode.symbolId;
	}

	get isMaster() {
		return this.xdNode.isMaster;
	}

	get widgetName() {
		return NodeUtils.getWidgetName(this.xdNode);
	}

	// This currently bypasses the caching model in ExportRoot.
	serialize(serializer, ctx) {
		if (serializer.root == this) {
			// Export component
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
			let master = ctx.masterComponents[this.id];
			if (master) {
				// Export reference to master
				if (ctx.target === ContextTarget.CLIPBOARD) {
					ctx.log.warn(`Component widget ${master.widgetName} not exported during copy to clipboard operation.`, null);
				}
				// TODO: CE: There is a case currently where if the user passed parameter name
				// in this instance differs from the master this will break as the
				// parameter name won't match the serialized widget's parameter name.
				// This also applies to parameter types, if the types of the instances parameters
				// differ from the masters this will try an pass the wrong types (we only allow editing on master to fix the parameter name issue)
				// TODO: CE: Serialize own parameters
				let parameterList = Object.values(this.childParameters).map(
					(ref) => ref.parameter.value ? `${ref.name}: ${serializer.serializeParameterValue(ref.parameter.owner.xdNode, ref.parameter.value, ctx)}` : ""
				).filter((ref) => ref != "").join(", ");
				if (parameterList)
					parameterList += ", ";
				let str = `${master.widgetName}(${parameterList})`;
				return str;
			} else {
				ctx.log.error('Master component could not be found.', this.xdNode);
				return "Container()";
			}
		}
	}
}

exports.Component = Component;
