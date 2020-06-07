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
const { NodeDecorator } = require("./nodedecorator");

class Layout extends NodeDecorator {
	static create(node, ctx) {
		return new Layout(node, ctx);
	}

	_serialize(nodeStr, ctx) {
		if (!this.node.layout) { return nodeStr; }
		return (this.node.responsive) ? this._pin(nodeStr, ctx) : this._transform(nodeStr, ctx);
	}

	_pin(nodeStr, ctx) {
		let xdNode = this.node.xdNode;

		// TODO: GS: TEMPORARY:
		return this._transform(nodeStr, ctx);

		let bounds = xdNode.boundsInParent, size = xdNode.parent.localBounds;

		return 'Pinned.fromSize(' +
			`bounds: Rectangle(${bounds.x}, ${bounds.y}, ${bounds.width}, ${bounds.height}, ), ` +
			`size: Size(${size.width}, ${size.height}), ` +

		')';
			
		// adjustTransform? rotation? Possibly wrap it in a transform?
		// need to disable all the fixed sizes on Text, Rect, Ellipse, etc.
		// add import.
	}

	_transform(nodeStr, ctx) {
		let node = this.node, xdNode = node.xdNode;
		let mtx = xdNode.transform, lb = xdNode.localBounds;

		// TODO: GS: address in adjustTransform?
		if (!(xdNode instanceof xd.Group)) { mtx.translate(lb.x, lb.y); }

		// If the node wants to modify it's own transform do that here
		mtx = node.adjustTransform(mtx);

		if (mtx.a !== 1.0 || mtx.b !== 0.0 || mtx.c !== 0.0 || mtx.d !== 1.0) {
			// Full transform matrix
			// High precision for a-d, since rotation needs it.
			nodeStr = "Transform(transform: Matrix4(" +
				`${$.fix(mtx.a, 6)}, ${$.fix(mtx.b, 6)}, 0.0, 0.0, ` +
				`${$.fix(mtx.c, 6)}, ${$.fix(mtx.d, 6)}, 0.0, 0.0, ` +
				"0.0, 0.0, 1.0, 0.0, " +
				`${$.fix(mtx.e, 2)}, ${$.fix(mtx.f, 2)}, 0.0, 1.0 ` +
				`), child: ${nodeStr},` +
			")";
		} else if (mtx.e !== 0 || mtx.f !== 0) {
			// Only translation
			nodeStr = "Transform.translate(" +
				`offset: Offset(${$.fix(mtx.e, 2)}, ${$.fix(mtx.f, 2)}), ` +
				`child: ${nodeStr},` +
			")";
		}
		return nodeStr;
	}
}
exports.Layout = Layout;
