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
const { ExportNode } = require("./exportnode");
const { getImageFilterParam } = require("../serialize/core");

class BackgroundBlur extends ExportNode {
	constructor(xdNode, child) {
		super(xdNode);
		// TODO: GS: rewrite to use children?
		this.child = child;
	}

	_serialize(serializer, ctx) {
		let str = "BackdropFilter(" +
		getImageFilterParam(this.xdNode.blur, serializer, ctx) +
			`child: ${this.child.toString(serializer, ctx)},` +
			")";
		let clipType = _getClipType(this.child.xdNode);
		if (clipType) { str = `${clipType}(child: ${str},)`; }
		return str;
	}
}
exports.BackgroundBlur = BackgroundBlur;

class ObjectBlur extends ExportNode {
	constructor(xdNode, child) {
		super(xdNode);
		// TODO: GS: rewrite to use children?
		this.child = child;
	}

	_serialize(serializer, ctx) {
		let bounds = this.child.xdNode.localBounds;
		let blurAmount = this.xdNode.blur.blurAmount;
		let bx = $.fix(bounds.x - blurAmount);
		let by = $.fix(bounds.y - blurAmount);
		let bw = $.fix(bounds.width + blurAmount * 2);
		let bh = $.fix(bounds.height + blurAmount * 2);

		let clipType = _getClipType(this.child.xdNode);
		let str = "Stack(overflow: Overflow.visible, children: <Widget>[" +
			this.child.toString(serializer, ctx) + "," +
			`Positioned(left: ${bx}, top: ${by}, width: ${bw}, height: ${bh}, child: ${clipType}(child:BackdropFilter(` +
			getImageFilterParam(this.xdNode.blur, serializer, ctx) +
			`child: Container(color: const Color(0x00000000)), ),` +
			"),),],)";

		return str;
	}
}
exports.ObjectBlur = ObjectBlur;

function _getClipType(xdNode) {
	return xdNode instanceof xd.Rectangle ? "ClipRect" :
		xdNode instanceof xd.Ellipse ? "ClipOval" :
		null;
}
