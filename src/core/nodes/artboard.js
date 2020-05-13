/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const xd = require("scenegraph");
const utils = require("../utils");
const NodeUtils = require("../nodeutils");
const serialize = require("../serialize");
const { ContextTarget } = require("../context");

class Artboard {
	constructor(xdNode) {
		this.xdNode = xdNode;
		this.children = [];
		this.parameters = {};
		this.childParameters = {};
	}

	toString(serializer, ctx) {
		if (serializer.root == this) {
			let backgroundStr = ``;
			if (this.xdNode.fillEnabled && this.xdNode.fill && (this.xdNode.fill instanceof xd.Color)) {
				let color = this.xdNode.fill;
				let opacity = this.xdNode.opacity;
				backgroundStr = `backgroundColor: ${serialize.getColorWithOpacityString(color, opacity)}, `
			}

			let str = `Scaffold(${backgroundStr}body: Stack(children: <Widget>[`;
			str += serialize.getChildListString(this.children, serializer, ctx);
			str += "],), )";
			return str;
		} else {
			if (ctx.target === ContextTarget.CLIPBOARD) {
				// TODO: GS: Can this happen?
				ctx.log.warn(`Artboard widget ${this.widgetName} not exported during copy to clipboard operation.`, null);
			}
			// TODO: CE: Serialize own parameters
			let parameterList = Object.values(this.childParameters).map(
				(ref) => ref.parameter.value ? `${ref.name}: ${serializer.serializeParameterValue(ref.parameter.owner.xdNode, ref.parameter.value, ctx)}` : ""
			).filter((ref) => ref != "").join(", ");
			if (parameterList)
				parameterList += ", ";
			let str = `${this.widgetName}(${parameterList})`;
			return str;
		}
	}

	get id() {
		return this.xdNode.guid;
	}

	get widgetName() {
		return NodeUtils.getWidgetName(this.xdNode);
	}


}

exports.Artboard = Artboard;
