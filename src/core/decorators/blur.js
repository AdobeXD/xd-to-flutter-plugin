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
const { getImageFilterParam } = require("../serialize/core");

class Blur extends NodeDecorator {
	static create(node, ctx) {
		let xdNode = node.xdNode, blur = xdNode.blur;
		if (blur && blur.visible) {
			if (!(node instanceof Rectangle)) {
				ctx.log.warn("Blur is currently only supported on rectangles and ellipses.", xdNode);
				return;
			}
			if (!blur.isBackgroundEffect && node.responsive) {
				ctx.log.warn("Object blur is not supported in responsive layouts.", xdNode);
				return;
			}
			if (blur.isBackgroundEffect && Math.round(xdNode.blur.brightnessAmount) !== 0) {
				ctx.log.warn("Brightness is currently not supported on blurs.", xdNode);
			}
			ctx.usesUI();
			return new Blur(node, ctx);
		}
	}

	_serialize(nodeStr, serializer, ctx) {
		let xdNode = this.node.xdNode, blur = xdNode.blur;
		let clipType = xdNode instanceof xd.Rectangle ? "ClipRect" : "ClipOval";
		let filterParam = getImageFilterParam(blur, serializer, ctx);
		
		if (blur.isBackgroundEffect) {
			// background blur.
			let str = `BackdropFilter(${filterParam}child: ${nodeStr}, )`;
			return `${clipType}(child: ${str}, )`;
		}
		
		// object blur.
		// TODO: GS: maybe just remove object blur? It's pretty hacky, and may not be possible to support with responsive layout.
		let bounds = xdNode.localBounds;
		let blurRadius = blur.blurAmount * 1.5;
		let bx = $.fix(bounds.x - blurRadius);
		let by = $.fix(bounds.y - blurRadius);
		let bw = $.fix(bounds.width + blurRadius * 2);
		let bh = $.fix(bounds.height + blurRadius * 2);
		return "Stack(overflow: Overflow.visible, children: <Widget>[" +
			`${nodeStr}, ` +
			`Positioned(left: ${bx}, top: ${by}, width: ${bw}, height: ${bh}, ` +
				`child: ${clipType}(child:BackdropFilter(${filterParam}` +
					"child: Container(color: const Color(0x00000000)), )," +
				"), " +
			"), " + 
		"], )";
	}
}
exports.Blur = Blur;