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
const {getAlignment} = require("../../utils/exportutils");
const { LayoutType, getLayoutType, getGroupContentBounds, hasComplexTransform } = require("../../utils/layoututils");

const { AbstractDecorator } = require("./abstractdecorator");

class Layout extends AbstractDecorator {
	static create(node, ctx) { throw("Layout.create() called."); }

	constructor(node, ctx) {
		super(node, ctx);
		this.type = getLayoutType(this.xdNode); // can be overridden by the parent
		this.enabled = true; // completely disables any layout

		// ideally this would get moved to _serialize(), in case the parent changes it,
		// also for simplified cases (Center, etc):
		if (this.type == LayoutType.PINNED) { ctx.usesPinned(); }
	}

	get responsive() {
		return this.type === LayoutType.PINNED;
	}
	
	// indicates if a node should apply a fixed size to itself if possible:
	get shouldFixSize() {
		if (this.type !== LayoutType.PINNED) { return true; }
		// TODO: this can still lead to some redundancy right now because it isn't needed
		// for actual Pinned() outputs, but we can't determine that now without actually running _pin
		let o = this.xdNode.layout.resizeConstraints.values;
		return o.width && o.height;
	}

	_serialize(nodeStr, ctx) {
		let node = this.node;
		if (!node.layout || !this.enabled) { return nodeStr; }
		nodeStr = this._transform(nodeStr, ctx);
		if (this.type === LayoutType.PINNED) {
			nodeStr = this._pin(nodeStr, ctx);
		} else {
			// either TRANSFORM or FIXED_SIZE
			if (!node.setsOwnSize) { nodeStr = Layout.addSizedBox(nodeStr, node.adjustedBounds, ctx); }
			if (this.type === LayoutType.TRANSFORM) {
				nodeStr = this._translate(nodeStr, ctx);
			}
		}
		return nodeStr;
	}

	_getLayout() {
		// TODO: possibly generate a full layout string in advance, so that we can be more accurate with
		// shouldFixSize
	}

	_pin(nodeStr, ctx) {
		let xdNode = this.xdNode, o = xdNode.layout.resizeConstraints.values;
		if (!o) { return nodeStr; }

		let node = this.node;
		let size = getGroupContentBounds(xdNode.parent), bounds = node.adjustedBounds;

		// identify special cases:
		if (o.top && o.right && o.bottom && o.left) {
			if (this._isFullSize(size, bounds)) {
				return nodeStr;
			}
			// TODO: Container could apply margin instead
			return "Padding(" +
				`padding: ${this._getPadding(size, bounds)},` +
				`child: ${nodeStr}, ` +
			")";
		}
		if (o.width && o.height) {
			let alignment = this._getAlignment(o, size, bounds);
			if (alignment) {
				if (!node.setsOwnSize) { nodeStr = Layout.addSizedBox(nodeStr, bounds, ctx); }
				return alignment === "Alignment.center" ?
					`Center(child: ${nodeStr})`
					:
					"Align(" +
						`alignment: ${alignment}, ` +
						`child: ${nodeStr}, ` +
					")";
			}
		}

		// TODO: update Pinned to accept null for unnecessary (congruent) pins? ie. optimize for layout direction (vertical/horizontal/both).
		// ^ can use _isFullWidth/Height
		return "Pinned.fromPins(" +
			this._getHPin(o, size, bounds) + ", " +
			this._getVPin(o, size, bounds) + ", " +
			`child: ${nodeStr}, ` +
		")";
	}

	_getHPin(constraints, size, bounds) {
		let fix = $.fix, o = constraints, s = size, b = bounds, right = s.width - (b.x + b.width);
		let middle = (s.width == b.width) ? 0.5 : b.x / (s.width - b.width);
		// skipping the trailing comma hints dart_style to keep the Pin on one line:
		let params = [
			(o.width ? `size: ${fix(b.width)}` : null),
			(o.left ? `start: ${fix(b.x)}` : null),
			(o.right ? `end: ${fix(right)}` : null),
			(!o.left && !o.width ? `startFraction: ${fix(b.x/s.width, 4)}` : null),
			(!o.right && !o.width ? `endFraction: ${fix(right/s.width, 4)}` : null),
			(o.width && !o.left && !o.right ? `middle: ${fix(middle, 4)}` : null)
		];
		return "Pin(" + $.joinValues(params) + ")";
	}

	_getVPin(constraints, size, bounds) {
		let fix = $.fix, o = constraints, s = size, b = bounds, bottom = s.height - (b.y + b.height);
		let middle = (s.height == b.height) ? 0.5 : b.y / (s.height - b.height);
		let params = [
			(o.height ? `size: ${fix(b.height)}` : null),
			(o.top ? `start: ${fix(b.y)}` : null),
			(o.bottom ? `end: ${fix(bottom)}` : null),
			(!o.top && !o.height ? `startFraction: ${fix(b.y/s.height, 4)}` : null),
			(!o.bottom && !o.height ? `endFraction: ${fix(bottom/s.height, 4)}` : null),
			(o.height && !o.top && !o.bottom ? `middle: ${fix(middle, 4)}` : null)
		];
		return "Pin(" + $.joinValues(params) + ")";
	}

	_translate(nodeStr, ctx) {
		let node = this.node;
		let bounds = node.adjustedBounds;
		if ($.almostEqual(bounds.x, 0, 0.1) && $.almostEqual(bounds.y, 0, 0.1)) { return nodeStr; }
		return "Transform.translate(" +
			`offset: Offset(${$.fix(bounds.x)}, ${$.fix(bounds.y)}), ` +
			`child: ${nodeStr},` +
		")";
	}

	_transform(nodeStr, ctx) {
		let transform = this.node.transform;

		if (!hasComplexTransform(this.node, "Rotation and flip are not fully supported in responsive layouts.", ctx)) {
			return nodeStr;
		}
		if (transform.flipY) {
			nodeStr = 'Transform(' +
				'alignment: Alignment.center, ' +
				`transform: Matrix4.identity()..rotateZ(${this._getAngle(transform)})..scale(1.0, -1.0), ` +
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

	_getAngle(rotation) {
		return $.fix(rotation / 180 * Math.PI, 4);
	}

	_isFullWidth(size, bounds) {
		return $.almostEqual(bounds.x, 0, 0.5) && $.almostEqual(bounds.width, size.width, 0.5);
	}

	_isFullHeight(size, bounds) {
		return $.almostEqual(bounds.y, 0, 0.5) && $.almostEqual(bounds.height, size.height, 0.5);
	}

	_isFullSize(size, bounds) {
		return this._isFullWidth(size, bounds) && this._isFullHeight(size, bounds);
	}

	_isCentered(size, bounds) {
		let x1 = bounds.x + bounds.width/2, x2 = size.width/2;
		let y1 = bounds.y + bounds.height/2, y2 = size.height/2;
		return $.almostEqual(x1, x2, 0.5) && $.almostEqual(y1, y2, 0.5);
	}

	_getPadding(size, bounds) {
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

	_getAlignment(o, size, bounds) {
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
}

Layout.addSizedBox = function(nodeStr, size, ctx) {
	return `SizedBox(width: ${$.fix(size.width, 0)}, height: ${$.fix(size.height, 0)}, child: ${nodeStr},)`;
}

exports.Layout = Layout;
