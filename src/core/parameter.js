

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

