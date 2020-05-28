/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const $ = require("../../utils/utils");
const { Rectangle } = require("./rectangle");
const { getDecorationParam } = require("../serialize/decorations");

class Ellipse extends Rectangle {
	// An ellipse is just a rectangle that calculates its size differently
	// and always uses a decoration because it always has rounded corners.
	_serialize(serializer, ctx) {
		let o = this.xdNode;
		let w = $.fix(o.radiusX * 2), h = $.fix(o.radiusY * 2);
		let c = getDecorationParam(o, serializer, ctx, this.parameters);
		return `Container(width: ${w}, height: ${h}, ${c})`;
	}
}
exports.Ellipse = Ellipse;
 