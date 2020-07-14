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

const { AbstractWidget } = require("./abstractwidget");
const { getColor } = require("../../utils/exportutils");

class Artboard extends AbstractWidget {
	static create(xdNode, ctx) { throw("Artboard.create() called."); }

	get symbolId() {
		return this.xdNode.guid;
	}

	_serialize(ctx) {
		return `${this.widgetName}(${this._getParamList(ctx)})`;
	}

	get adjustedBounds() {
		// we don't want the artboard's position in the document.
		let xdNode = this.xdNode;
		return {x: 0, y: 0, width: xdNode.width, height: xdNode.height};
	}

	_serializeWidgetBody(ctx) {
		return `Scaffold(${this._getBackgroundColorParam(ctx)}body: ${this._getChildStack(ctx)}, )`;
	}

	_getBackgroundColorParam(ctx) {
		let xdNode = this.xdNode, fill = xdNode.fillEnabled && xdNode.fill, color;
		if (fill instanceof xd.Color) { color = fill; }
		else if (fill) {
			ctx.log.warn("Only solid color backgrounds are supported for artboards.", xdNode);
			let stops = fill.colorStops;
			if (stops && stops.length > 0) { color = stops[0].color; }
		}
		return color ? `backgroundColor: ${getColor(color)}, ` : "";
	}
}

exports.Artboard = Artboard;
