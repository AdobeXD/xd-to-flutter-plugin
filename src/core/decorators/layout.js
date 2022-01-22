/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const $ = require("../../utils/utils");
const { getAlignment } = require("../../utils/exportutils");
const { addSizedBox, getGroupContentBounds, hasComplexTransform } = require("../../utils/layoututils");

const { AbstractDecorator } = require("./abstractdecorator");

class Layout extends AbstractDecorator {
	static create(node, ctx) { throw("Layout.create() called."); }

	constructor(node, ctx) {
		super(node, ctx);
		this.enabled = true; // set to false to disable layout without changing settings.
	}

	reset() {
		// these properties are set in calculate():
		this.type = LayoutType.NONE;
		this.direction = LayoutDirection.BOTH; // for stack layouts
		this.padding = null;
		this.isFixedSize = false; // indicates layout should fix the size, can be adjusted externally
		this.isResponsive = false; // will move or resize when parent resizes. Ex. Center is both fixed size and responsive.

		// these properties are set by the target or its parent after .calculate() is run
		// they only affect serialize:
		this.shouldExpand = false; // indicates that a SizedBox.expand should be added. Defaults to false.
		this.shouldFixSize = false; // indicates that a SizedBox should be added. Defaults to the value of isFixedSize.
	}

	calculate(ctx) {
		// this precalculates the layout details. These properties can be overridden,
		// for example, by the node itself or its parent node.
		let node = this.node, xdNode = this.xdNode;
		let constraints = xdNode.layout.resizeConstraints, o = constraints && constraints.values;
		let parent = xdNode.parent, xdParentLayout = parent && parent.layout;
		let tmp, pBounds, bounds;

		this.reset();

		if (!xdParentLayout) { // widget definition
			this.enabled = false;
			return this;
		}

		this.parentBounds = pBounds = getGroupContentBounds(parent);
		this.bounds = bounds = node.adjustedBounds;

		if (xdParentLayout && xdParentLayout.type === "stack") {
			// In a stack.
			let isVertical = xdParentLayout.stack.orientation === "vertical";
			this.direction = isVertical ? LayoutDirection.VERTICAL : LayoutDirection.HORIZONTAL;
			let shouldPin = o && (
				(isVertical && !o.width && this._isFullWidth()) ||
				(!isVertical && !o.height && this._isFullHeight())
			);
			this.type = shouldPin ? LayoutType.NONE : LayoutType.PINNED;
			this.isResponsive = shouldPin;
			this.isFixedSize = !shouldPin;
		} else if (!bounds || !o) {
			// missing either bounds (rare) or constraints (not set to responsive)
			this.type = LayoutType.TRANSLATE;
			this.isFixedSize = true;
		} else if (o.top && o.right && o.bottom && o.left) {
			this.type = LayoutType.NONE;
			if (!this._isFullSize()) { this.padding = this._getPadding(); }
			this.isResponsive = true;
		} else if (o.width && o.height && (tmp = this._getAlignment(o))) {
			this.type = (tmp === "Alignment.center") ? LayoutType.CENTER : LayoutType.ALIGN;
			this.isFixedSize = true;
			this.isResponsive = true;
			this.alignment = tmp;
		} else {
			this.type = LayoutType.PINNED;
			this.isResponsive = true;
		}
		this.shouldFixSize = this.isFixedSize;

		// ideally this would get moved to _serialize(), in case someone changes it:
		if (this.type === LayoutType.PINNED) { ctx.usesPinned(); }
		return this;
	}

	_serialize(nodeStr, ctx) {
		let node = this.node;

		if (!this.enabled) { return nodeStr; }

		// work from inside out:
		nodeStr = this._transform(nodeStr, ctx);
		if (this.shouldFixSize) { nodeStr = addSizedBox(nodeStr, this.bounds, ctx); }
		else if (this.shouldExpand) { nodeStr = this._expand(nodeStr, ctx); }

		if (this.padding) { nodeStr = this._padding(nodeStr, ctx); }
		
		if (this.type === LayoutType.NONE) { return nodeStr; }
		if (this.type === LayoutType.TRANSLATE) { return this._translate(nodeStr, ctx); }
		if (this.type === LayoutType.CENTER) { return this._center(nodeStr, ctx); }
		if (this.type === LayoutType.ALIGN) { return this._align(nodeStr, ctx); }
		if (this.type === LayoutType.PINNED) { return this._pinned(nodeStr, ctx); }
		ctx.log.error(`Unexpected layout type: ${this.type}`, node.xdNode);
	}

	_expand(nodeStr, ctx) {
		return `SizedBox.expand(child: ${nodeStr})`;
	}

	_pinned(nodeStr, ctx) {
		// TODO: update Pinned to accept null for unnecessary (congruent) pins? ie. optimize for layout direction (vertical/horizontal/both).
		// ^ can use _isFullWidth/Height
		let constraints = this.xdNode.layout.resizeConstraints;
		let o = constraints && constraints.values;
		return "Pinned.fromPins(" +
			this._getHPin(o, this.bounds, this.parentBounds) + ", " +
			this._getVPin(o, this.bounds, this.parentBounds) + ", " +
			`child: ${nodeStr}, ` +
		")";
	}

	_getHPin(o, b, pb) {
		if (this.direction === LayoutDirection.HORIZONTAL) { return this._getDefaultPin(); }
		return this._getPin(o.left, o.width, o.right,  b.x, b.width,  pb.width);
	}

	_getVPin(o, b, pb) {
		if (this.direction === LayoutDirection.VERTICAL) { return this._getDefaultPin(); }
		return this._getPin(o.top, o.height, o.bottom,  b.y, b.height,  pb.height);
	}
	
	_getDefaultPin() {
		return "Pin()";
	}

	_getPin(cSt, cSz, cEnd,  bSt, bSz,  pSz) {
		// c = constraints, b = bounds, p = parent bounds
		let fix = $.fix, end = pSz - (bSt + bSz);
		let middle = (pSz === bSz) ? 0.5 : bSt / (pSz - bSz);
		let params = [
			(cSz ? `size: ${fix(bSz)}` : null),
			(cSt ? `start: ${fix(bSt)}` : null),
			(cEnd ? `end: ${fix(end)}` : null),
			(!cSt && !cSz ? `startFraction: ${fix(bSt/pSz, 4)}` : null),
			(!cEnd && !cSz ? `endFraction: ${fix(end/pSz, 4)}` : null),
			(cSz && !cSt && !cEnd ? `middle: ${fix(middle, 4)}` : null)
		];
		return "Pin(" + $.joinValues(params) + ")";
	}

	_translate(nodeStr, ctx) {
		let bounds = this.bounds;
		let isOrigin = $.almostEqual(bounds.x, 0, 0.1) && $.almostEqual(bounds.y, 0, 0.1);
		return isOrigin ? nodeStr : "Transform.translate(" +
			`offset: Offset(${$.fix(bounds.x)}, ${$.fix(bounds.y)}), ` +
			`child: ${nodeStr},` +
		")";
	}

	_padding(nodeStr, ctx) {
		return !this.padding ? "" : "Padding(" +
			`padding: ${this.padding},` +
			`child: ${nodeStr}, ` +
		")";
	}

	_align(nodeStr, ctx) {
		return !this.alignment ? "" : "Align(" +
			`alignment: ${this.alignment}, ` +
			`child: ${nodeStr}, ` +
		")";
	}

	_center(nodeStr, ctx) {
		return `Center(child: ${nodeStr},)`;
	}

	_transform(nodeStr, ctx) {
		let transform = this.node.transform;

		if (this.isResponsive && !hasComplexTransform(this.node, "Rotation and flip are not fully supported in responsive layouts.", ctx)) {
			return nodeStr;
		}
		if (transform.flipY) {
			nodeStr = 'Transform(' +
				'alignment: Alignment.center, ' +
				`transform: Matrix4.identity()..rotateZ(${this._getAngle(transform.rotation)})..scale(1.0, -1.0), ` +
				`child: ${nodeStr}, ` +
			')';
		} else if (transform.rotation % 360 !== 0) {
			nodeStr = 'Transform.rotate(' +
				`angle: ${this._getAngle(transform.rotation)}, ` +
				`child: ${nodeStr}, ` +
			')';
		}
		return nodeStr;
	}

	_getPadding() {
		let size = this.parentBounds, bounds = this.bounds;
		let l = bounds.x, r = size.width - (l + bounds.width);
		let t = bounds.y, b = size.height - (t + bounds.height);

		if ($.almostEqual(l, r, 0.5) && $.almostEqual(t, b, 0.5)) {
			if ($.almostEqual(l, t, 0.5)) {
				return `EdgeInsets.all(${$.fix(l)})`;
			}
			return "EdgeInsets.symmetric(" +
				`horizontal: ${$.fix(l)}, ` +
				`vertical: ${$.fix(t)} ` +
			")";
		}
		// leave out trailing commas to prevent auto-format from putting every value on a new line:
		return "EdgeInsets.fromLTRB(" +
			`${$.fix(l)}, ${$.fix(t)}, ${$.fix(r)}, ${$.fix(b)} ` +
		")";
	}

	_getAlignment(o) {
		let size = this.parentBounds, bounds = this.bounds;
		let hStr, x = bounds.x, w = size.width - bounds.width;
		let vStr, y = bounds.y, h = size.height - bounds.height;

		if ($.almostEqual(y, 0, 0.5)) { vStr = "top"; }
		else if ($.almostEqual(y, h/2, 0.5)) { vStr = "center"; }
		else if ($.almostEqual(y, h, 0.5)) { vStr = "bottom"; }

		if ((o.top && vStr !== "top") || (o.bottom && vStr !== "bottom")) { return; }

		if ($.almostEqual(x, 0, 0.5)) { hStr = "Left"; }
		else if ($.almostEqual(x, w/2, 0.5)) { hStr = "Center"; }
		else if ($.almostEqual(x, w, 0.5)) { hStr = "Right"; }

		if ((o.left && hStr !== "Left") || (o.right && hStr !== "Right")) { return; }
		
		let str = (hStr && vStr) ? vStr + hStr : null;
		if (str === "centerCenter") { str = "center"; }
		if (str) { return `Alignment.${str}`; }
		return getAlignment(x/w, y/h);
	}
	
	_getAngle(rotation) {
		return $.fix(rotation / 180 * Math.PI, 4);
	}

	_isFullWidth() {
		return $.almostEqual(this.bounds.x, 0, 0.5) &&
			$.almostEqual(this.bounds.width, this.parentBounds.width, 0.5);
	}

	_isFullHeight() {
		return $.almostEqual(this.bounds.y, 0, 0.5) &&
			$.almostEqual(this.bounds.height, this.parentBounds.height, 0.5);
	}

	_isFullSize() {
		return this._isFullWidth() && this._isFullHeight();
	}

	_isCentered() {
		let size = this.parentBounds, bounds = this.bounds;
		let x1 = bounds.x + bounds.width/2, x2 = size.width/2;
		let y1 = bounds.y + bounds.height/2, y2 = size.height/2;
		return $.almostEqual(x1, x2, 0.5) && $.almostEqual(y1, y2, 0.5);
	}
}

exports.Layout = Layout;

var LayoutType = Object.freeze({
	PINNED: "pinned",
	ALIGN: "align",
	CENTER: "center",
	TRANSLATE: "translate",
	NONE: "none",
});
exports.LayoutType = LayoutType;

var LayoutDirection = Object.freeze({
	VERTICAL: "vertical",
	HORIZONTAL: "horizontal",
	BOTH: "both",
});
exports.LayoutDirection = LayoutDirection;