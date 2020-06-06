/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const { ExportWidget } = require("./exportwidget");
const NodeUtils = require("../../utils/nodeutils");
const PropType = require("../proptype");
const { ParamType } = require("../parameter");
const { ContextTarget } = require("../context");
const { OnTap } = require("../decorators/ontap");

class Component extends ExportWidget {
	static create(xdNode, ctx) { throw("Component.create() called."); }

	constructor(xdNode, ctx) {
		super(xdNode, ctx);
		this.diff = null;

		this.addParam(ParamType.FUNCTION, "onTap", null, NodeUtils.getProp(this.xdNode, PropType.TAP_CALLBACK_NAME));
	}

	get isMaster() {
		return this.xdNode.isMaster;
	}

	_serialize(ctx) {
		let master = ctx.masterComponents[this.symbolId];
		if (!master) {
			ctx.log.error('Master component could not be found.', this.xdNode);
			return "Container()";
		}
		if (ctx.target === ContextTarget.CLIPBOARD) {
			ctx.log.warn(`Component widget ${master.widgetName} not exported during copy to clipboard operation.`, null);
		}
		let nodeStr = `${master.widgetName}(${this._getParamList(ctx)})`;
		return this._decorate(nodeStr, ctx);
	}

	_serializeWidgetBody(ctx) {
		let nodeStr = `Stack(children: <Widget>[${this._getChildList(this.children, ctx)}], )`;
		// for Component, onTap is not handled by the decorator, because it isn't instance based:
		return OnTap.get(nodeStr, NodeUtils.getProp(this.xdNode, PropType.TAP_CALLBACK_NAME));
	}
}

exports.Component = Component;
