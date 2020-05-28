/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

class Parameter {
	constructor(owner, type, name, value) {
		this.owner = owner;
		this.type = type;
		this.name = name;
		this.value = value;
	}
}
exports.Parameter = Parameter;

class ParameterRef {
	constructor(parameter, isOwn, exportName=null) {
		this.parameter = parameter;

		// Should the parameter be serialized by the owning node
		// if false, some parent node will be responsible for serializing the value
		this.isOwn = isOwn;

		// Name of the parameter in Dart, if null this value is not to be
		// hoisted by a parent node
		this.exportName = exportName;
	}

	get name() {
		return this.exportName || this.parameter.name || null;
	}
}
exports.ParameterRef = ParameterRef;

exports.ParamType = Object.freeze({
	BOOL: "Boolean",
	COLOR: "Color",
	STRING: "String",
	IMAGE_FILL: "ImageFill",
});
