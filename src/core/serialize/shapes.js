/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

// Serialization methods related to vector shapes

const $ = require("../../utils/utils");

function getShapeDataName(node, serializer, ctx) {
	return $.cleanVarName(`_svg_${node.getSvgId(serializer, ctx)}`);
}
exports.getShapeDataName = getShapeDataName;

function getShapeDataProps(node, serializer, ctx) {
	let shapeData = ctx.files[node.widgetName].shapeData;
	let str = "", names = {};
	for (let [k, node] of Object.entries(shapeData)) {
		const name = getShapeDataName(node, serializer, ctx);
		if (names[name]) { continue; }
		names[name] = true;
		const svgString = node.toSvgString(serializer, ctx);
		str += `const String ${name} = '${svgString}';`;
	}
	return str;
}
exports.getShapeDataProps = getShapeDataProps;