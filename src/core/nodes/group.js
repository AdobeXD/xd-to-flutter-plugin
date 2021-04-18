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
const { normalizeSpacings, normalizePadding, getGroupContentBounds, hasComplexTransform, mergeBounds } = require("../../utils/layoututils");

const { AbstractNode } = require("./abstractnode");
const PropType = require("../proptype");
const { fix } = require("../../utils/utils");
const { Layout } = require("../decorators/layout");


class Group extends AbstractNode {
	static create(xdNode, ctx) {
		if (xdNode instanceof xd.Group || xdNode instanceof xd.ScrollableGroup) {
			return new Group(xdNode, ctx);
		}
	}

	constructor(xdNode, ctx) {
		super(xdNode, ctx);
		this.children = [];
		
		ctx.addParam(this.addParam("onTap", NodeUtils.getProp(this.xdNode, PropType.TAP_CALLBACK_NAME), DartType.TAP_CB));
	}

	get background() {
		let padding = this.xdNode.layout.padding;
		return padding && padding.background;
	}

	_normalizeChildren() {
		// removes the background child if appropriate.
		return this.children.slice(!!this.background ? 1 : 0);
	}

	_serialize(ctx) {
		if (!this.hasChildren) { return ""; }

		let xdNode = this.xdNode, layout = xdNode.layout, str;
		if (xdNode.mask) { ctx.log.warn("Group masks aren't supported.", xdNode); }

		// determine group type:
		if (layout.type == "stack") {
			str = this._serializeFlex(ctx);
		} else {
			str = this._getChildStack(this._normalizeChildren(), ctx);
		}

		str = this._addPadding(str, ctx);
		str = this._addBackground(str, ctx);
		str = this._addScrolling(str, ctx);
		
		return str;
	}

	_serializeFlex(ctx) {
		let xdNode = this.xdNode, layout = xdNode.layout;
		let isVertical = layout.stack.orientation == "vertical";

		let str = (isVertical ? "Column(" : "Row(") +
			"crossAxisAlignment: CrossAxisAlignment.stretch, " +
			`children: <Widget>[${this._getFlexChildren(ctx)}], ` +
		")";
		return str;
	}

	_getFlexChildren(ctx) {
		let str = "", space;
		let xdNode = this.xdNode, layout = xdNode.layout;
		let isVertical = layout.stack.orientation == "vertical";
		let spaces = normalizeSpacings(layout.stack.spacings, this.children.length-1).reverse();
		let kids = this._normalizeChildren().reverse();
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

	_addBackground(str, ctx) {
		let padding = this.xdNode.layout.padding, bg = this.background;
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

	_addPadding(str, ctx) {
		let padding = this.xdNode.layout.padding;
		let pad = normalizePadding(padding && padding.values);
		if (!pad) { return str; }
		return 'Padding(' +
			`padding: EdgeInsets.` + (pad.homogenous ?
				`all(${fix(pad.top)})` :
				`fromLTRB(${fix(pad.left)}, ${fix(pad.top)}, ${fix(pad.right)}, ${fix(pad.bottom)})`) +
			`, child: ${str}, ` +
		')';
	}

	_addScrolling(str, ctx) {
		let xdNode = this.xdNode, vp = xdNode.viewport;
		if (!(xdNode instanceof xd.ScrollableGroup) || !vp) { return str; }
		return 'SingleChildScrollView(' +
			this._getScrollDirectionParam(ctx) +
			`child: ${Layout.addSizedBox(str, mergeBounds(this.xdNode.children), ctx)}, ` +
		')';
	}

	_getScrollDirectionParam(ctx) {
		let dir = this.xdNode.scrollingType;
		if (dir === xd.ScrollableGroup.PANNING) {
			ctx.log.warn("Panning scroll groups are not supported.", this.xdNode);
		}
		return dir === xd.ScrollableGroup.HORIZONTAL ? "scrollDirection: Axis.horizontal, " : "";
	}

}
exports.Group = Group;
