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

const $ = require("../../utils/utils");
const NodeUtils = require("../../utils/nodeutils");
const { getParamValue, DartType } = require("../../utils/exportutils");

const { ExportNode } = require("./exportnode");
const PropType = require("../proptype");

class Grid extends ExportNode {
	static create(xdNode, ctx) {
		if (xdNode instanceof xd.RepeatGrid) {
			ctx.addImport("package:adobe_xd/specific_rect_clip.dart");
			return new Grid(xdNode, ctx);
		}
	}

	constructor(xdNode, ctx) {
		super(xdNode, ctx);
		this.item = null;
	}
	
	_serialize(ctx) {
		let o = this.xdNode;
		if (!this.item || o.children.length < 1) {
			ctx.log.error( "Repeat grid has no children.", o);
			return "";
		}
		if (o.paddingX < 0 || o.paddingY < 0) {
			ctx.log.warn("Negative grid spacing is not supported.", o);
		}

		let params = this._getParams();
		let l=o.children.length, childData = new Array(l).fill(""), paramVarStr = "";
		for (let n in params) {
			let vals = params[n];
			paramVarStr += `final ${n} = map['${n}'];\n`;
			for (let i=0; i<l; i++) {
				childData[i] += `'${n}': ${vals[i]}, `;
			}
		}
		let childDataStr = `{${childData.join("}, {")}}, `;
		let childStr = this.item.serialize(ctx);

		let xSpacing = Math.max(0, o.paddingX), ySpacing = Math.max(0, o.paddingY);
		let aspectRatio = $.fix(o.cellSize.width / o.cellSize.height, 4);
		let cols = o.numColumns, rows = o.numRows;
		let gridWidth = o.cellSize.width * cols + xSpacing * (cols - 1);
		let gridHeight = o.cellSize.height * rows + ySpacing * (rows - 1);

		return 'SpecificRectClip(' +
			`rect: Rect.fromLTWH(0, 0, ${o.width}, ${o.height}), ` +
			'child: UnconstrainedBox(' +
				'alignment: Alignment.topLeft, ' +
				'child: Container(' +
					`width: ${gridWidth}, height: ${gridHeight}, ` +
					'child: GridView.count(' +
						'primary: false, padding: EdgeInsets.all(0), ' +
						`mainAxisSpacing: ${ySpacing}, crossAxisSpacing: ${xSpacing}, ` +
						`crossAxisCount: ${cols}, childAspectRatio: ${aspectRatio}, ` +
						`children: [${childDataStr}].map((map) { ${paramVarStr} return ${childStr}; }).toList(),` +
					'), ' +
				'), ' +
			'), ' +
		')';
	}
	
	_getParams() {
		let params = {};
		this._diff(this.item, this.xdNode.children.map(o => o), params);
		return params;
	}

	_diff(node, xdNodes, params) {
		let master = xdNodes[0];
		
		// Currently in XD, only text content and image fills can be different in grid items.
		if (master instanceof xd.Text) {
			let name = NodeUtils.getProp(master, PropType.TEXT_PARAM_NAME) || this._getName(params, "text");
			if (this._diffField(params, xdNodes, name, this._getText)) {
				node.addParam("text", name);
			}
		} else if ((master instanceof xd.Rectangle || master instanceof xd.Ellipse) && master.fill instanceof xd.ImageFill) {
			let name = NodeUtils.getProp(master, PropType.IMAGE_PARAM_NAME) || this._getName(params, "image");
			if (this._diffField(params, xdNodes, name, this._getImage)) {
				node.addParam("fill", name);
			}
		}
		
		for (let i=0, l=master.children.length; i<l; i++) {
			let childNode = node.children[i];
			this._diff(childNode, xdNodes.map(o => o.children.at(i)), params);
		};
	}

	_getName(params, name) {
		let count = 0, n = name;
		while (params[n]) { n = name + "_" + (count++); }
		return n;
	}

	_diffField(params, xdNodes, name, valueF) {
		let a = valueF(xdNodes[0]), values=[], diff=false;
		for (let i=0, l=xdNodes.length; i<l; i++) {
			let xdNode = xdNodes[i], b = valueF(xdNode);
			if (a !== b) { diff = true; }
			values[i] = b;
		}
		if (diff) { params[name] = values; }
		return diff;
	}

	_getText(xdNode) { return getParamValue(xdNode, xdNode.text); }

	_getImage(xdNode) { return getParamValue(xdNode, xdNode.fill); }
	
}
exports.Grid = Grid;
