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

class Blend extends ExportNode {
	
	constructor(xdNode, child) {
		super(xdNode);
		this.children = [child];
	}

	_serialize(serializer, ctx) {
		let o = this.xdNode, bounds = o.boundsInParent;
		let region = "", child = this.children[0];
		if (child.xdNode instanceof xd.Group) {
			let lx = $.fix(bounds.x), ly = $.fix(bounds.y);
			let lw = $.fix(bounds.width), lh = $.fix(bounds.height);
			region = `region: Offset(${lx}, ${ly}) & Size(${lw}, ${lh}),`;
		}

		let mode = Blend.MODE_MAP[o.blendMode];
		if (!mode) { ctx.log.warn(`Unsupported blend mode '${o.blendMode}'`, o); }
		let str = "BlendMask(" +
			`blendMode: BlendMode.${mode || "src"},` +
			`opacity: ${o.opacity},` +
			region +
			`child: ${child.serialize(serializer, ctx)},` +
			")";

		return str;
	}
}

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

exports.Blend = Blend;
