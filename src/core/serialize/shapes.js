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

const $ = require("../utils");

function getShapeDataName(node, serializer, ctx) {
	return $.cleanVarName(`_svg_${node.xdNode.guid}`);
}
exports.getShapeDataName = getShapeDataName;

function getShapeDataProps(node, serializer, ctx) {
	let str = "";
	let shapeData = ctx.files[node.widgetName].shapeData;

	for (let [k, v] of Object.entries(shapeData)) {
		const name = getShapeDataName(v, serializer, ctx);
		const svgString = v.toSvgString(serializer, ctx);
		str += `const String ${name} = '${svgString}';`;
	}
	return str;
}
exports.getShapeDataProps = getShapeDataProps;