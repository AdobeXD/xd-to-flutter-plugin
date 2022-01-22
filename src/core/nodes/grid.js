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
const { getString, getAssetImage, DartType, getScrollView } = require("../../utils/exportutils");

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
		// TODO: it would be nice to include the first child in the default value,
		// but that's tricky if we need to add the param in the constructor instead of _serialize
		ctx.addParam(this.addParam("data", NodeUtils.getProp(xdNode, PropType.DATA_PARAM_NAME), DartType.GRID_DATA, "const []"));
	}
	
	_serialize(ctx) {
		let o = this.xdNode, item = this.item, layout = item.layout;
		if (!item || o.children.length < 1) {
			ctx.log.error( "Repeat grid has no children.", o);
			return "";
		}
		if (item.children.length < 1) {
			ctx.log.warn("Repeat grid item is empty.", o);
			return "";
		}
		if (o.paddingX < 0 || o.paddingY < 0) {
			ctx.log.warn("Negative grid spacing is not supported.", o);
		}
		
		let itemIsResponsive= this._itemIsResponsive();
		if (itemIsResponsive) {
			item = this._stripVirtualGroup(item);
			// disable any layout on the inner group:
			layout.enabled = false;
		} else {
			// TODO: should we strip the virtual group if there is only a single child?
			// disable layout except adding a sized box:
			layout.reset();
			layout.shouldFixSize = true;
		}

		// TODO: it would be great to add explicit types to the params at some point
		// ex. children: <Map<String, dynamic>>
		// ex. final String value = o['foo'];
		let params = this._getParams(ctx);
		let l=o.children.length, childData = new Array(l).fill(""), paramVarStr = "";
		let ns = !!NodeUtils.getProp(xd.root, PropType.NULL_SAFE) ? "!" : "";

		for (let n in params) {
			let vals = params[n];
			paramVarStr += `final ${n} = ${Grid.mapParamName}['${n}']${ns};\n`;
			for (let i=0; i<l; i++) {
				childData[i] += `'${n}': ${vals[i]}, `;
			}
		}
		let childDataStr = `[{${childData.join("}, {")}}]`;

		let dataParamName = NodeUtils.getProp(o, PropType.DATA_PARAM_NAME);
		if (dataParamName) {
			childDataStr = dataParamName;
		}
		
		let itemStr = item.serialize(ctx);

		let xSpacing = Math.max(0, o.paddingX), ySpacing = Math.max(0, o.paddingY);
		let cellW = o.cellSize.width, cellH = o.cellSize.height;
		let aspectRatio = $.fix(cellW / cellH, 2);
		
		let cols = (o.width + xSpacing) / (o.cellSize.width + xSpacing);
		let colCount = Math.round(cols), delta = Math.abs(cols - colCount);

		if (delta > 0.15) {
			ctx.log.warn("Partial columns are not supported in repeat grids.", o);
		}

		let str = itemIsResponsive ?
			`GridView.count(` +
				`mainAxisSpacing: ${ySpacing}, crossAxisSpacing: ${xSpacing}, ` +
				`crossAxisCount: ${colCount}, ` +
				`childAspectRatio: ${aspectRatio}, ` +
				`children: ${childDataStr}.map((${Grid.mapParamName}) { ${paramVarStr} return ${itemStr}; }).toList(),` +
			')'
			:
			getScrollView(`Wrap(` +
				'alignment: WrapAlignment.center, ' +
				`spacing: ${xSpacing}, runSpacing: ${ySpacing}, ` +
				`children: ${childDataStr}.map((${Grid.mapParamName}) { ${paramVarStr} return ${itemStr}; }).toList(),` +
			')', this, ctx);
		
		return str;
	}

	_itemIsResponsive() {
		// check to see if the virtual group has a single child:
		let item = this.item, kids = item && item.children;
		if (!kids || kids.length !== 1) { return false; }
		// now check if that child has children and if they are responsive
		kids = kids[0].children;
		return !!(kids && kids.length > 0 && kids[0].layout.isResponsive);
	}

	_stripVirtualGroup(item) {
		let kids = item && item.children;
		return !kids || kids.length !== 1 ? item : kids[0];
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
			let pName = NodeUtils.getProp(master, PropType.TEXT_PARAM_NAME);
			let name = pName || this._getName(params, "text");
			if (this._diffField(params, xdNodes, name, this._getText, !!pName, ctx)) {
				node.addParam("text", name);
			}
		} else if ((master instanceof xd.Rectangle || master instanceof xd.Ellipse) && master.fill instanceof xd.ImageFill) {
			let pName = NodeUtils.getProp(master, PropType.IMAGE_PARAM_NAME);
			let name = pName || this._getName(params, "image");
			if (this._diffField(params, xdNodes, name, this._getImage, !!pName, ctx)) {
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

	_diffField(params, xdNodes, name, valueF, force, ctx) {
		let a = valueF(xdNodes[0]), values=[], diff=!!force;
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

Grid.mapParamName = 'itemData';
exports.Grid = Grid;
