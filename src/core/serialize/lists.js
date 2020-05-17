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

const { getTransformedNodeString } = require("./layout");
const { ContextTarget } = require("../context");

function getChildListString(children, serializer, ctx) {
	let result = "";
	children.forEach(node => {
		let childStr = getTransformedNodeString(node, serializer, ctx);
		if (childStr) childStr += ",";
		result += childStr;
	});
	return result;
}
exports.getChildListString = getChildListString;

function getParameterListString(serializer, ctx, parameters) {
	let str = "";
	if (!parameters) { return str; }
	for (let n in parameters) {
		let ref = parameters[n], param = ref.parameter, value = param.value;
		let valStr = serializer.serializeParameterValue(param.owner.xdNode, value, ctx);
		str += `this.${ref.name}${valStr ? ` = ${valStr}` : ''}, `;
	}
	return str;
}
exports.getParameterListString = getParameterListString;

function getParameterMemberListString(serializer, parameters) {
	if (!parameters)
		return "";

	let str = Object.values(parameters).map(
		(ref) => `final ${serializer.jsTypeToDartType(ref.parameter.type)} ${ref.name}`).join(";");
	if (str)
		str += ";"
	return str;
}
exports.getParameterMemberListString = getParameterMemberListString;

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