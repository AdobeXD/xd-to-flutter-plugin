/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

// Serialization methods related to interaction or gestures
const $ = require("../../utils/utils");

function getSizedGestureDetector(xdNode, serializer, ctx, paramName, isOwn) {
	if (isOwn) { return ""; }

	let width = $.fix(xdNode.localBounds.width);
	let height = $.fix(xdNode.localBounds.height);
	let str = `Align(alignment: Alignment.topLeft, child: Container(width: ${width}, height: ${height}, child: GestureDetector(onTap: () => ${paramName}?.call()), ), )`;
	return str;
}
exports.getSizedGestureDetector = getSizedGestureDetector;
