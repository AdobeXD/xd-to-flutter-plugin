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
const { AbstractDecorator } = require("./abstractdecorator");

class Layout extends AbstractDecorator {
	static create(node, ctx) { throw("Layout.create() called."); }

	constructor(node, ctx) {
		super(node, ctx);
		if (node.responsive) { ctx.usesPinned(); }
	}

	_serialize(nodeStr, ctx) {
		let node = this.node;
		if (!node.layout) { return nodeStr; }
		nodeStr = this._transform(nodeStr, ctx);
		return (node.responsive) ? this._pin(nodeStr, ctx) : this._translate(nodeStr, ctx);
	}

	_pin(nodeStr, ctx) {
		let xdNode = this.node.xdNode, C = xd.SceneNode;
		let size = xdNode.parent.localBounds;
		let bounds = this.node.adjustedBounds;
		let hConstraints = xdNode.horizontalConstraints, vConstraints = xdNode.verticalConstraints;
		let hPos = hConstraints.position, hSize = hConstraints.size;
		let vPos = vConstraints.position, vSize = vConstraints.size;

		return "Pinned.fromSize(" +
			`bounds: Rect.fromLTWH(${$.fix(bounds.x)}, ${$.fix(bounds.y)}, ${$.fix(bounds.width)}, ${$.fix(bounds.height)}), ` +
			`size: Size(${$.fix(size.width)}, ${$.fix(size.height)}), ` +
			(hPos === C.FIXED_LEFT || hPos === C.FIXED_BOTH ? "pinLeft: true, " : "") +
			(hPos === C.FIXED_RIGHT || hPos === C.FIXED_BOTH ? "pinRight: true, " : "") +
			(vPos === C.FIXED_TOP || vPos === C.FIXED_BOTH ? "pinTop: true, " : "") +
			(vPos === C.FIXED_BOTTOM || vPos === C.FIXED_BOTH ? "pinBottom: true, " : "") +
			(hSize === C.SIZE_FIXED ? "fixedWidth: true, " : "") +
			(vSize === C.SIZE_FIXED ? "fixedHeight: true, " : "") +
			`child: ${nodeStr}, ` +
		")";
	}

	_translate(nodeStr, ctx) {
		let node = this.node, xdNode = node.xdNode;
		let bounds = node.adjustedBounds;
		let xStr = $.fix(bounds.x), yStr = $.fix(bounds.y);
		if (xStr === "0.0" && yStr === "0.0") { return nodeStr; }
		return "Transform.translate(" +
			`offset: Offset(${$.fix(bounds.x)}, ${$.fix(bounds.y)}), ` +
			`child: ${nodeStr},` +
		")";
	}

	_transform(nodeStr, ctx) {
		let transform = this.node.transform, str = nodeStr;
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
		if (str !== nodeStr) {
			ctx.log.warn("Rotation and flip are not fully supported in responsive layouts.", this.node.xdNode);
		}
		return nodeStr;
	}

	_getAngle(transform) {
		return $.fix(transform.rotation / 180 * Math.PI, 4);
	}
}
exports.Layout = Layout;
