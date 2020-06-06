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
const { getOpacity } = require("../../utils/nodeutils");
const { getColor, getAssetImage } = require("../../utils/exportutils");

class Serializer {

	constructor(root) {
		this.parameterSerializeFnMap = {};
		this._buildParameterSerializeFnMap();
	}

	// TODO: GS: Evaluate moving this:
	getNodeString(node, ctx) {
		return node.serialize(this, ctx) || '';
	}

	serializeParameterValue(xdNode, value, ctx) {
		if (value == null) { return null; } // do not use strict equality here.
		let fn = this.parameterSerializeFnMap[value.constructor.name];
		if (fn) {
			return fn(xdNode, value, ctx);
		} else {
			ctx.log.error(`Serializer does not support serializing ${value.constructor.name}.`, xdNode);
			return null;
		}
	}

	jsTypeToDartType(type) {
		switch (type) {
			case "Boolean": return "bool";
			case "ImageFill": return "ImageProvider";
			case "Function": return "VoidCallback";
			default: return type;
		}
	}

	_buildParameterSerializeFnMap() {
		let fnMap = this.parameterSerializeFnMap;
		fnMap["Color"] = (xdNode, value) => getColor(value, getOpacity(xdNode));
		fnMap["String"] = (xdNode, value) => `'${$.escapeString(value)}'`;
		fnMap["Boolean"] = (xdNode, value) => value ? "true" : "false";
		fnMap["ImageFill"] = (xdNode, value, ctx) => getAssetImage(xdNode, this, ctx);
	}

}
exports.Serializer = Serializer;

















