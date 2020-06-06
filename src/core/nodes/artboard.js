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

const { ExportWidget } = require("./exportwidget");
const { getColor } = require('../serialize/colors');
const { getChildList } = require('../serialize/lists');

class Artboard extends ExportWidget {
	static create(xdNode, ctx) { throw("Artboard.create() called."); }

	get symbolId() {
		return this.xdNode.guid;
	}

	_serialize(serializer, ctx) {
		return `${this.widgetName}(${this._getParamList(serializer, ctx)})`;
	}

	_serializeWidgetBody(serializer, ctx) {
		let xdNode = this.xdNode, fill = xdNode.fillEnabled && xdNode.fill, bgParam = "";
		if (fill && (fill instanceof xd.Color)) {
			bgParam = `backgroundColor: ${getColor(fill, xdNode.opacity)}, `;
		}
		return `Scaffold(${bgParam}body: Stack(children: <Widget>[` +
			getChildList(this.children, serializer, ctx) +
		"], ), )";
	}
}

exports.Artboard = Artboard;
