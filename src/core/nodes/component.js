/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const NodeUtils = require("../../utils/nodeutils");
const { DartType } = require("../../utils/exportutils");

const { AbstractWidget } = require("./abstractwidget");
const PropType = require("../proptype");
const { ContextTarget } = require("../context");
const { OnTap } = require("../decorators/ontap");
const { Parameter } = require("../parameter");

class Component extends AbstractWidget {
	static create(xdNode, ctx) { throw("Component.create() called."); }

	constructor(xdNode, ctx) {
		super(xdNode, ctx);

		let tapCB = NodeUtils.getProp(this.xdNode, PropType.TAP_CALLBACK_NAME);
		if (tapCB) { this.addChildParam(new Parameter(tapCB, DartType.TAP_CB), ctx); }
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
		let str = `${master.widgetName}(${this._getParamList(ctx)})`;
		return this._decorate(str, ctx);
	}

	_serializeWidgetBody(ctx) {
		let str = this._getChildStack(this.children, ctx);
		// for Component, onTap is not handled by the decorator, because it isn't instance based:
		return OnTap.get(str, NodeUtils.getProp(this.xdNode, PropType.TAP_CALLBACK_NAME));
	}
}

exports.Component = Component;
