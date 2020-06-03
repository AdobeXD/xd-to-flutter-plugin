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

const { ExportNode } = require("./exportnode");

class Path extends ExportNode {
	static create(xdNode, ctx) {
		if (xdNode instanceof xd.Path || xdNode instanceof xd.Polygon || xdNode instanceof xd.Line  || xdNode instanceof xd.BooleanGroup) {
			ctx.usesSVG();
			return new Path(xdNode);
		}
	}

	constructor(xdNode, ctx) {
		super(xdNode, ctx);
	}

	serialize(serializer, ctx) {
		// Path objects are converted to Shapes in combineShapes
		throw("Path.serialize() called.");
	}
}
exports.Path = Path;

