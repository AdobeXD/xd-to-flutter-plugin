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
const { Rectangle } = require("../nodes/rectangle");

class Blur extends NodeDecorator {
	static create(node, ctx) {
		let xdNode = node.xdNode, blur = xdNode.blur;
		if (blur && blur.visible) {
			if (!(node instanceof Rectangle)) {
				ctx.log.warn("Blur is currently only supported on rectangles and ellipses.", xdNode);
				return;
			}
			if (!blur.isBackgroundEffect) {
				ctx.log.warn("Object blur is not supported.", xdNode);
				return;
			}
			if (blur.isBackgroundEffect && Math.round(xdNode.blur.brightnessAmount) !== 0) {
				ctx.log.warn("Brightness is currently not supported on blurs.", xdNode);
			}
			ctx.usesUI();
			return new Blur(node, ctx);
		}
	}

	_serialize(nodeStr, ctx) {
		let xdNode = this.node.xdNode, blur = xdNode.blur;
		let clipType = xdNode instanceof xd.Rectangle ? "ClipRect" : "ClipOval";
		let filterParam = _getImageFilterParam(blur, ctx);
		return `${clipType}(child: BackdropFilter(${filterParam}child: ${nodeStr}, ), )`;
	}
}
exports.Blur = Blur;


function _getImageFilterParam(blur, ctx) {
	// currently just exports blurs.
	return `filter: ${_getImageFilter(blur, ctx)}, `;
}

function _getImageFilter(blur, ctx) {
	let sigStr = $.fix(blur.blurAmount, 2);
	return `ui.ImageFilter.blur(sigmaX: ${sigStr}, sigmaY: ${sigStr})`;
}