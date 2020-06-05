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

const { ExportNode } = require("./exportnode");
const NodeUtils = require("../../utils/nodeutils");
const { getColor } = require('../serialize/colors');
const { getChildList, getParamList } = require('../serialize/lists');

class Artboard extends ExportNode {
	static create(xdNode, ctx) { throw("Artboard.create() called."); }

	constructor(xdNode, ctx) {
		super(xdNode, ctx);
		this.children = [];

		// TODO: GS: revisit whether this can utilize the addParam method instead:
		this.parameters = {};
		this.childParameters = {};
	}

	get widgetName() {
		return NodeUtils.getWidgetName(this.xdNode);
	}

	get symbolId() {
		return this.xdNode.guid;
	}

	// This currently bypasses the caching model in ExportRoot.
	// Also, _decorate is never applied (Artboards don't have decorations).
	serialize(serializer, ctx) {
		return this._serialize(serializer, ctx);
	}

	_serialize(serializer, ctx) {
		let xdNode = this.xdNode;
		if (serializer.root == this) {
			// Widget class.
			let fill = xdNode.fillEnabled && xdNode.fill, bgParam = "";
			if (fill && (fill instanceof xd.Color)) {
				bgParam = `backgroundColor: ${getColor(fill, xdNode.opacity)}, `;
			}

			let str = `Scaffold(${bgParam}body: Stack(children: <Widget>[`;
			str += getChildList(this.children, serializer, ctx);
			str += "],), )";
			return str;
		} else {
			// Instance. Used for prototype navigation.
			let nodeStr = `${this.widgetName}(${this._getParamList(serializer, ctx)})`;
			return nodeStr;
		}
	}
}

exports.Artboard = Artboard;
