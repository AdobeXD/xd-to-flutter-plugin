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
const { DartType } = require("../../utils/exportutils");
const { normalizeSpacings, normalizePadding, getGroupContentBounds, hasComplexTransform } = require("../../utils/layoututils");

const { AbstractNode } = require("./abstractnode");
const PropType = require("../proptype");
const { fix } = require("../../utils/utils");


class Group extends AbstractNode {
	static create(xdNode, ctx) {
		if (xdNode instanceof xd.Group) {
			return new Group(xdNode, ctx);
		}
	}

	constructor(xdNode, ctx) {
		super(xdNode, ctx);
		this.children = [];
		
		ctx.addParam(this.addParam("onTap", NodeUtils.getProp(this.xdNode, PropType.TAP_CALLBACK_NAME), DartType.TAP_CB));
	}

	_serialize(ctx) {
		if (!this.hasChildren) { return ""; }

		let xdNode = this.xdNode, layout = xdNode.layout, str;
		if (xdNode.mask) { ctx.log.warn("Group masks aren't supported.", xdNode); }

		// determine group type:
		if (layout.type == "stack") {
			str = this._serializeFlex(ctx);
		} else {
			str = this._getChildStack(ctx);
		}

		return str;
	}

	_serializeFlex(ctx) {
		let xdNode = this.xdNode, layout = xdNode.layout;
		let isVertical = layout.stack.orientation == "vertical";
		let bg = layout.padding && layout.padding.background;
		let pad = layout.padding && layout.padding.values;

		let str = (isVertical ? "Column(" : "Row(") +
			"crossAxisAlignment: CrossAxisAlignment.stretch, " +
			`children: <Widget>[${this._getFlexChildren(ctx)}], ` +
		")";

		str = this._addPadding(str, pad, ctx);
		str = this._addBackground(str, bg, ctx);
		return str;
	}

	_getFlexChildren(ctx) {
		let str = "", space;
		let xdNode = this.xdNode, layout = xdNode.layout;
		let isVertical = layout.stack.orientation == "vertical";
		let hasBg = !!(layout.padding && layout.padding.background);
		let spaces = normalizeSpacings(layout.stack.spacings, this.children.length-1).reverse();
		let kids = this.children.slice(hasBg ? 1 : 0).reverse();
		let parentBounds = getGroupContentBounds(xdNode.parent);

		kids.forEach((node, i) => {
			if (!node) { return; }
			let pinned = this._shouldPinFlexChild(node, isVertical, parentBounds, ctx);

			node.layout.enabled = pinned;
			let childStr = node.serialize(ctx);
			let size = isVertical ? node.xdNode.localBounds.height : node.xdNode.localBounds.width;
			childStr = `SizedBox(${isVertical ? 'height' : 'width'}: ${fix(size)}, child: ${childStr}, )`;
			if (!childStr) { return; }

			if (space = spaces[i-1]) {
				str += `SizedBox(${isVertical ? 'height' : 'width'}: ${fix(space)}, ), `;
			}

			str += childStr + ", ";
		});
		return str;
	}

	_shouldPinFlexChild(node, isVertical, parentBounds, ctx) {
		let xdNode = node.xdNode, o = xdNode.layout.resizeConstraints;
		if (!o) { return false; }
		let b0 = parentBounds, b1 = node.adjustedBounds;
		let fullSize = isVertical ? $.almostEqual(b0.width, b1.width, 1) : $.almostEqual(b0.height, b1.height, 1);
		o = o.values;
		// return true if node is the full size of its parent & pinned to both sides.
		return !fullSize ||
			(isVertical && (!o.left || !o.right || o.width)) ||
			(!isVertical && (!o.top || !o.bottom || o.height));
	}

	_addBackground(str, bg, ctx) {
		if (!bg) { return str; }
		let bgNode = this.children[0];
		bgNode.layout.enabled = false;
		// this is just for the error generation:
		hasComplexTransform(bgNode, "Rotation and flip are not supported for background elements.", ctx);
		return 'Stack(children: [\n' +
			'// background:\n' +
			`Positioned.fill(child: ${bgNode.serialize(ctx)}, ), ` +
			`Positioned.fill(child: ${str}, ), ` +
		'], )';
	}

	_addPadding(str, pad, ctx) {
		pad = normalizePadding(pad);
		if (!pad) { return str; }
		return 'Padding(' +
			`padding: EdgeInsets.` + (pad.homogenous ?
				`all(${fix(pad.top)})` :
				`fromLTRB(${fix(pad.left)}, ${fix(pad.top)}, ${fix(pad.right)}, ${fix(pad.bottom)})`) +
			`, child: ${str},` +
		')';
	}

}
exports.Group = Group;
