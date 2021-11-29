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

class Blend extends AbstractDecorator {
	static create(node, ctx) {
		let xdNode = node.xdNode, blend = xdNode.blendMode;
		if (!blend || blend === "pass-through" || blend === "normal") { return; }
		if (!Blend.MODE_MAP[blend]) {
			ctx.log.warn(`Unsupported blend mode '${blend}'`, xdNode);
			return;
		}
		ctx.addImport("package:adobe_xd/blend_mask.dart", false);
		return new Blend(node, ctx);
	}

	_serialize(nodeStr, ctx) {
		let xdNode = this.node.xdNode, bounds = xdNode.boundsInParent;
		let mode = Blend.MODE_MAP[xdNode.blendMode], region = "";

		if (xdNode instanceof xd.Group && this.node.layout.shouldFixSize) {
			let lx = $.fix(bounds.x), ly = $.fix(bounds.y);
			let lw = $.fix(bounds.width), lh = $.fix(bounds.height);
			region = `region: Offset(${lx}, ${ly}) & Size(${lw}, ${lh}), `;
		}

		let str = "BlendMask(" +
			`blendMode: BlendMode.${mode || "src"}, ` +
			//`opacity: ${xdNode.opacity}, ` +
			region +
			`child: ${nodeStr}, ` +
		")";

		return str;
	}
}
exports.Blend = Blend;

Blend.MODE_MAP = {
	"pass-through": "src",
	"normal": "srcOver",
	"darken": "darken",
	"multiply": "multiply",
	"color-burn": "colorBurn",
	"lighten": "lighten",
	"screen": "screen",
	"color-dodge": "colorDodge",
	"overlay": "overlay",
	"soft-light": "softLight",
	"hard-light": "hardLight",
	"difference": "difference",
	"exclusion": "exclusion",
	"hue": "hue",
	"saturation": "saturation",
	"color": "color",
	"luminosity": "luminosity",
}

