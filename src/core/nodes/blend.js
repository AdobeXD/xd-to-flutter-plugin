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
const utils = require("../utils");
const serialize = require("../serialize");

class Blend {
	constructor(xdNode, child) {
		this.xdNode = xdNode;
		this.children = [ child ];
	}

	toString(serializer, ctx) {
		let opacity = this.xdNode.opacity;
		let region = ``;
		let child = this.children[0];
		if (child.xdNode instanceof xd.Group) {
			let lx = utils.fix(this.xdNode.boundsInParent.x);
			let ly = utils.fix(this.xdNode.boundsInParent.y);
			let lw = utils.fix(this.xdNode.boundsInParent.width);
			let lh = utils.fix(this.xdNode.boundsInParent.height);
			region = `region: Offset(${lx}, ${ly}) & Size(${lw}, ${lh}),`;
		}
		let str = "BlendMask(" +
			`blendMode: ${getBlendMode(this.xdNode.blendMode)},` +
			`opacity: ${opacity},` +
			region +
			`child: ${child.toString(serializer, ctx)},` +
			")";

		return str;
	}
}
exports.Blend = Blend;

function getBlendMode(blendModeStr) {
	let result = "BlendMode.src";
	switch (blendModeStr) {
		case "pass-through": result = "BlendMode.src"; break;
		case "normal": result = "BlendMode.srcOver"; break;
		case "darken": result = "BlendMode.darken"; break;
		case "multiply": result = "BlendMode.multiply"; break;
		case "color-burn": result = "BlendMode.colorBurn"; break;
		case "lighten": result = "BlendMode.lighten"; break;
		case "screen": result = "BlendMode.screen"; break;
		case "color-dodge": result = "BlendMode.colorDodge"; break;
		case "overlay": result = "BlendMode.overlay"; break;
		case "soft-light": result = "BlendMode.softLight"; break;
		case "hard-light": result = "BlendMode.hardLight"; break;
		case "difference": result = "BlendMode.difference"; break;
		case "exclusion": result = "BlendMode.exclusion"; break;
		case "hue": result = "BlendMode.hue"; break;
		case "saturation": result = "BlendMode.saturation"; break;
		case "color": result = "BlendMode.color"; break;
		case "luminosity": result = "BlendMode.luminosity"; break;
	}
	return result;
}
