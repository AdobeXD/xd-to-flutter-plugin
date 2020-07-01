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
		if (!this.node.layout) { return nodeStr; }
		return (this.node.responsive) ? this._pin(nodeStr, ctx) : this._transform(nodeStr, ctx);
	}

	_pin(nodeStr, ctx) {
		let xdNode = this.node.xdNode, C = xd.SceneNode;
		let size = xdNode.parent.localBounds;
		let bounds = this.node.adjustedBounds;
		let hConstraints = xdNode.horizontalConstraints, vConstraints = xdNode.verticalConstraints;
		let hPos = hConstraints.position, hSize = hConstraints.size;
		let vPos = vConstraints.position, vSize = vConstraints.size;
		
		if (this._isComplexTransform(this.node.adjustTransform(xdNode.transform))) {
			ctx.log.warn("Rotation is not fully supported in responsive layouts.", xdNode);
			nodeStr = `Transform.rotate(angle: ${$.fix(xdNode.rotation / 180 * Math.PI, 4)}, child: ${nodeStr})`;
		}

		return "Pinned.fromSize(" +
			`bounds: Rectangle(${$.fix(bounds.x)}, ${$.fix(bounds.y)}, ${$.fix(bounds.width)}, ${$.fix(bounds.height)}), ` +
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

	_transform(nodeStr, ctx) {
		let node = this.node, xdNode = node.xdNode;
		let mtx = xdNode.transform, lb = xdNode.localBounds;

		// TODO: GS: address in adjustTransform?
		if (!(xdNode instanceof xd.Group)) { mtx.translate(lb.x, lb.y); }

		// If the node wants to modify it's own transform do that here
		mtx = node.adjustTransform(mtx);

		if (this._isComplexTransform(mtx)) {
			// Full transform matrix
			// High precision for a-d, since rotation needs it.
			nodeStr = "Transform(transform: Matrix4(" +
				`${$.fix(mtx.a, 5)}, ${$.fix(mtx.b, 5)}, 0.0, 0.0, ` +
				`${$.fix(mtx.c, 5)}, ${$.fix(mtx.d, 5)}, 0.0, 0.0, ` +
				"0.0, 0.0, 1.0, 0.0, " +
				`${$.fix(mtx.e)}, ${$.fix(mtx.f)}, 0.0, 1.0 ` +
				`), child: ${nodeStr},` +
			")";
		} else if (mtx.e !== 0 || mtx.f !== 0) {
			// Only translation
			nodeStr = "Transform.translate(" +
				`offset: Offset(${$.fix(mtx.e)}, ${$.fix(mtx.f)}), ` +
				`child: ${nodeStr},` +
			")";
		}
		return nodeStr;
	}

	_isComplexTransform(mtx) {
		return mtx.a !== 1.0 || mtx.b !== 0.0 || mtx.c !== 0.0 || mtx.d !== 1.0;
	}
}
exports.Layout = Layout;
