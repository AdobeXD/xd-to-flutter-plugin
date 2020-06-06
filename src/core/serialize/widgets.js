/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/


// Serialization methods related to widgets
function getWidget(node, serializer, ctx) {
	let className = node.widgetName, parameters = null;
	if (node.parameters && node.childParameters) {
		parameters = {};
		for (let paramRef of Object.values(node.parameters).concat(Object.values(node.childParameters))) {
			if (paramRef.exportName) { parameters[paramRef.exportName] = paramRef; }
		}
	}

	let propStr = "", paramStr = "";
	for (let n in parameters) {
		let ref = parameters[n], param = ref.parameter, value = param.value;
		let valStr = serializer.serializeParameterValue(param.owner.xdNode, value, ctx);
		paramStr += `this.${ref.name}${valStr ? ` = ${valStr}` : ''}, `;
		propStr += `final ${serializer.jsTypeToDartType(ref.parameter.type)} ${ref.name};\n`;
	}

	let body = serializer.serializeWidget(node, ctx);
	let str = `class ${className} extends StatelessWidget {\n` +
		propStr +
		`${className}({ Key key, ${paramStr}}) : super(key: key);\n` +
		`@override Widget build(BuildContext context) { return ${body} }` +
		`}`;
	return str;
}
exports.getWidget = getWidget;