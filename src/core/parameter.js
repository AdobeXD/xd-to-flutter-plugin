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
	constructor(owner, type, name, value, optional) {
		this.owner = owner;
		this.type = type;
		this.name = name;
		this.value = value;
		this.optional = optional || false;
	}
}

exports.Parameter = Parameter;

class ParameterRef {
	constructor(parameter, isOwn, exportName) {
		this.parameter = parameter;

		// Is own referes to if the value referenced in the parameter is to be serialized by the owning node
		// if false, some parent node will be responsible for serializing the value
		this.isOwn = isOwn;

		// Export name referes to the name of the parameter in dart code, if null this value is not to be
		// hoisted by a parent node
		this.exportName = exportName || null;
	}

	get name() {
		if (this.exportName)
			return this.exportName;
		else
			return this.parameter.name;
	}
}

exports.ParameterRef = ParameterRef;

