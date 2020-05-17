/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

// Serialization methods related to different list types

const { getTransformedNode } = require("./layout");
const { ContextTarget } = require("../context");

function getChildList(children, serializer, ctx) {
	let result = "";
	children.forEach(node => {
		let childStr = getTransformedNode(node, serializer, ctx);
		if (childStr) { result += childStr + ", "; }
	});
	return result;
}
exports.getChildList = getChildList;

function getImportListString(node, serializer, ctx) {
	let str = "import 'package:flutter/material.dart';\n";
	let imports = Object.values(ctx.files[node.widgetName].imports);
	imports.forEach((imp) => {
		if (ctx.target === ContextTarget.FILES || !imp.isWidgetImport) {
			str += `import '${imp.name}'`;
			if (imp.scope) {
				str += ` as ${imp.scope}`;
			}
			str += ";\n";
		}
	});
	return str;
}
exports.getImportListString = getImportListString;