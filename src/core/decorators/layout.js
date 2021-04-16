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
const { LayoutType, getLayoutType, getGroupContentBounds, hasComplexTransform } = require("../../utils/layoututils");

const { AbstractDecorator } = require("./abstractdecorator");

class Layout extends AbstractDecorator {
	static create(node, ctx) { throw("Layout.create() called."); }

	constructor(node, ctx) {
		super(node, ctx);
		this.type = getLayoutType(this.xdNode); // can be overridden by the parent
		this.enabled = true; // completely disables any layout

		// ideally this would get moved to _serialize(), in case the parent changes it:
		if (this.type == LayoutType.PINNED) { ctx.usesPinned(); }
	}

	get responsive() {
		return this.type === LayoutType.PINNED;
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

	_pin(nodeStr, ctx) {
		// TODO: optimize for layout direction (vertical/horizontal/both).
		let xdNode = this.xdNode, o = xdNode.layout.resizeConstraints.values;
		if (!o) { return nodeStr; }

		let size = getGroupContentBounds(xdNode.parent), bounds = this.node.adjustedBounds;
		
		// TODO: this seems to work, but requires more testing:
		//let pinH = this._needsHPin(o, size, bounds), pinV = this._needsVPin(o, size, bounds);
		//if (!pinH && !pinV) { return nodeStr; }

		// TODO: update Pinned to accept null for unnecessary (congruent) pins:
		return "Pinned.fromPins(" +
			this._getHPin(o, size, bounds) + ", " +
			this._getVPin(o, size, bounds) + ", " +
			`child: ${nodeStr}, ` +
		")";
	}

	_needsHPin(constraints, size, bounds) {
		return !constraints.left || !constraints.right ||
			!$.almostEqual(bounds.x, 0, 0.5) ||
			!$.almostEqual(bounds.width, size.width, 0.5);
	}

	_needsVPin(constraints, size, bounds) {
		return !constraints.top || !constraints.bottom ||
			!$.almostEqual(bounds.y, 0, 0.5) ||
			!$.almostEqual(bounds.height, size.height, 0.5);
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
				`angle: ${this._getAngle(transform)}, ` +
				`child: ${nodeStr}, ` +
			')';
		}
		return nodeStr;
	}

	_getAngle(transform) {
		return $.fix(transform.rotation / 180 * Math.PI, 4);
	}
}

Layout.addSizedBox = function(nodeStr, size, ctx) {
	return `SizedBox(width: ${$.fix(size.width, 0)}, height: ${$.fix(size.height, 0)}, child: ${nodeStr},)`;
}

exports.Layout = Layout;
