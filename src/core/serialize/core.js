/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

// Serialization methods that don't fit neatly in another category (yes, it's cheating)

const $ = require("../utils");
const { getImagePath } = require("../image_export");
const nodetype = require("../nodetype");
const { getParameterMemberListString, getParameterListString } = require("./lists");

function getAssetImageString(xdNode, serializer, ctx) {
	let path = getImagePath(xdNode);
	if (!path) { ctx.log.warn('Image does not have a Flutter image name.', xdNode); }
	return `const AssetImage('${path || ''}')`;
}
exports.getAssetImageString = getAssetImageString;

function getNodeNameComment(xdNode) {
	return xdNode && !xdNode.hasDefaultName ? `\n // Adobe XD layer: '${$.shorten(xdNode.name, 20)}' (${nodetype.getXDLabel(xdNode)})` : '';
}
exports.getNodeNameComment = getNodeNameComment;

function getImageFilterPropertyString(blur, serializer, ctx) {
	// currently just exports blurs.
	return `filter: ${_getImageFilterString(blur, serializer, ctx)}, `;
}
exports.getImageFilterPropertyString = getImageFilterPropertyString;

function _getImageFilterString(blur, serializer, ctx) {
	let sigStr = $.fix(blur.blurAmount, 2);
	return `ui.ImageFilter.blur(sigmaX: ${sigStr}, sigmaY: ${sigStr})`;
}

function getWidgetString(node, serializer, ctx) {
	let className = node.widgetName;
	let parameters = null;
	if (node.parameters && node.childParameters) {
		parameters = {};
		for (let paramRef of Object.values(node.parameters).concat(Object.values(node.childParameters))) {
			if (paramRef.exportName)
				parameters[paramRef.name] = paramRef;
		}
	}
	let body = serializer.serializeWidget(node, ctx);
	let str = `class ${className} extends StatelessWidget {\n` +
		getParameterMemberListString(serializer, parameters) +
		`${className}({ Key key, ${getParameterListString(serializer, ctx, parameters)}}) : super(key: key);\n` +
		`@override Widget build(BuildContext context) { return ${body} }` +
		`}`;
	return str;
}
exports.getWidgetString = getWidgetString;