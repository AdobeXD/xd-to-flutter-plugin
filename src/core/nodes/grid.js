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
const { getString, getAssetImage } = require("../../utils/exportutils");

const { AbstractNode } = require("./abstractnode");
const PropType = require("../proptype");

class Grid extends AbstractNode {
	static create(xdNode, ctx) {
		if (xdNode instanceof xd.RepeatGrid) {
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

		let item = this._getItem(this.item);
		// when the item is the virtual group, dynamicLayout returns true
		// but it disables child responsiveness anyway, so we need to do this:
		let itemIsResponsive = !!(item.children && item.children[0] && item.children[0].xdNode.horizontalConstraints);

		let params = this._getParams(ctx);
		let l=o.children.length, childData = new Array(l).fill(""), paramVarStr = "";
		for (let n in params) {
			let vals = params[n];
			paramVarStr += `final ${n} = map['${n}'];\n`;
			for (let i=0; i<l; i++) {
				childData[i] += `'${n}': ${vals[i]}, `;
			}
		}
		let childDataStr = `{${childData.join("}, {")}}`;
		let itemStr = item.serialize(ctx);

		let xSpacing = Math.max(0, o.paddingX), ySpacing = Math.max(0, o.paddingY);
		let cellW = o.cellSize.width, cellH = o.cellSize.height;
		let aspectRatio = $.fix(cellW / cellH, 4);
		
		let cols = (o.width + xSpacing/2) / (o.cellSize.width + xSpacing);
		let colCount = Math.round(cols), delta = Math.abs(cols - colCount);

		if (delta > 0.15) {
			ctx.log.warn("Partial columns are not supported in repeat grids.", o);
		}

		// TODO: GS: when .responsive is false, we likely have to wrap this in a SizedBox

		if (!itemIsResponsive) {
			itemStr = `SizedBox(width: ${cellW}, height: ${cellH}, child: ${itemStr})`;
			return `SingleChildScrollView(child: Wrap(` +
				'alignment: WrapAlignment.center, ' +
				`spacing: ${xSpacing}, runSpacing: ${ySpacing}, ` +
				`children: [${childDataStr}].map((map) { ${paramVarStr} return ${itemStr}; }).toList(),` +
			'), )';
		}
		return `GridView.count(` +
			`mainAxisSpacing: ${ySpacing}, crossAxisSpacing: ${xSpacing}, ` +
			`crossAxisCount: ${colCount}, ` +
			`childAspectRatio: ${aspectRatio}, ` +
			`children: [${childDataStr}].map((map) { ${paramVarStr} return ${itemStr}; }).toList(),` +
		')';
	}

	_getItem(o) {
		// this removes the "virtual group" that XD adds if its only child is a group / component.
		let onlyChild = o.children.length === 1 ? o.children[0] : null;
		return onlyChild && onlyChild.children ? onlyChild : o;
	}
	
	_getParams(ctx) {
		let params = {};
		this._diff(this.item, this.xdNode.children.map(o => o), params, ctx);
		return params;
	}

	_diff(node, xdNodes, params, ctx) {
		if (!node || !xdNodes || xdNodes.length < 1) { return; }
		let master = xdNodes[0];
		
		// Currently in XD, only text content and image fills can be different in grid items.
		if (master instanceof xd.Text) {
			let name = NodeUtils.getProp(master, PropType.TEXT_PARAM_NAME) || this._getName(params, "text");
			if (this._diffField(params, xdNodes, name, this._getText, ctx)) {
				node.addParam("text", name);
			}
		} else if ((master instanceof xd.Rectangle || master instanceof xd.Ellipse) && master.fill instanceof xd.ImageFill) {
			let name = NodeUtils.getProp(master, PropType.IMAGE_PARAM_NAME) || this._getName(params, "image");
			if (this._diffField(params, xdNodes, name, this._getImage, ctx)) {
				node.addParam("fill", name);
			}
		}
		
		for (let i=0, l=node.children && node.children.length; i<l; i++) {
			let childNode = node.children[i];
			this._diff(childNode, xdNodes.map(o => o.children.at(i)), params, ctx);
		};
	}

	_getName(params, name) {
		let count = 0, n = name;
		while (params[n]) { n = name + "_" + (count++); }
		return n;
	}

	_diffField(params, xdNodes, name, valueF, ctx) {
		let a = valueF(xdNodes[0]), values=[], diff=false;
		for (let i=0, l=xdNodes.length; i<l; i++) {
			let xdNode = xdNodes[i], b = valueF(xdNode, ctx);
			if (a !== b) { diff = true; }
			values[i] = b;
		}
		if (diff) { params[name] = values; }
		return diff;
	}

	_getText(xdNode, ctx) { return getString(xdNode.text); }

	_getImage(xdNode, ctx) { return getAssetImage(xdNode, ctx); }
	
}
exports.Grid = Grid;
