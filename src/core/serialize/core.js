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

const $ = require("../../utils/utils");
const { getImagePath } = require("../image_export");
const nodetype = require("../nodetype");
const { getParameterMemberListString, getConstructorParameterList } = require("./lists");

function getAssetImage(xdNode, serializer, ctx) {
	let path = getImagePath(xdNode);
	if (!path) { ctx.log.warn('Image does not have a Flutter image name.', xdNode); }
	return `const AssetImage('${path || ''}')`;
}
exports.getAssetImage = getAssetImage;

function getImageFilterParam(blur, serializer, ctx) {
	// currently just exports blurs.
	return `filter: ${_getImageFilter(blur, serializer, ctx)}, `;
}
exports.getImageFilterParam = getImageFilterParam;

function _getImageFilter(blur, serializer, ctx) {
	let sigStr = $.fix(blur.blurAmount, 2);
	return `ui.ImageFilter.blur(sigmaX: ${sigStr}, sigmaY: ${sigStr})`;
}