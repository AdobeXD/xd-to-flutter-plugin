/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/


const { trace } = require("../../utils/debug");
const { Parameter, ParameterRef } = require("../parameter");

// Abstract class representing the minimum interface required for an export node.
class ExportNode {
	// NodeDecorators should also have a static `create(xdNode, ctx)` method
	// that returns an instance if appropriate for the xdNode.

	constructor(xdNode, ctx) {
		this.xdNode = xdNode;
		this.parameters = null;
		this.childParameters = null;
		this.children = null;
		this.decorators = null;
		this.hasDecorators = false; // indicates this node has non-cosmetic decorators.
		this._cache = null;
	}

	get hasChildren() {
		return !!(this.children && this.children.length);
	}

	get responsive() {
		return !!this.xdNode.horizontalConstraints
	}

	get xdId() {
		return this.xdNode ? this.xdNode.guid : null;
	}

	get xdName() {
		return this.xdNode ? this.xdNode.name : null;
	}

	addDecorator(decorator) {
		this.decorators = this.decorators || [];
		this.decorators.push(decorator);
		if (!decorator.cosmetic) { this.hasDecorators = true; }
	}

	// TODO: GS: deep dive into param system.
	addParam(type, name, value, exportName=null, isOwn=true, childParam=false) {
		// Note that Component does not use name as the collection key, so it doesn't use this method.
		let o, param = new Parameter(this, type, name, value);
		if (!childParam) { o = this.parameters = this.parameters || {}; }
		else { o = this.childParameters = this.childParameters || {}; }
		o[name] = new ParameterRef(param, isOwn, exportName);
	}

	getParam(name, childParam=false) {
		let o = !childParam ? this.parameters : this.childParameters;
		return o && o[name] || null;
	}

	adjustTransform(mtx) {
		return mtx;
	}

	toString(serializer, ctx) {
		// TODO: remove.
		trace(`${this.constructor.name}.toString() called`);
		return this.serialize(serializer, ctx);
	}

	serialize(serializer, ctx) {
		if (this._cache === null) {
			let nodeStr = this._serialize(serializer, ctx);
			this._cache = this._decorate(nodeStr, serializer, ctx);
		}
		return this._cache;
	}

	_serialize(serializer, ctx) {
		return "";
	}

	_decorate(nodeStr, serializer, ctx) {
		let decorators = this.decorators, l = nodeStr && decorators ? decorators.length : 0;
		for (let i=0; i<l; i++) { nodeStr = decorators[i].serialize(nodeStr, serializer, ctx); }
		return nodeStr;
	}

	_getParamList(serializer, ctx) {
		// TODO: GS: this is only used by Widget nodes. Possibly move.
		// TODO: CE: Serialize own parameters
		// TODO: CE: There is a case currently where if the user passed parameter name
		// in this instance differs from the master this will break as the
		// parameter name won't match the serialized widget's parameter name.
		// This also applies to parameter types, if the types of the instances parameters
		// differ from the masters this will try an pass the wrong types (we only allow editing on master to fix the parameter name issue)
		let str = "", params = this.childParameters;
		for (let n in params) {
			let ref = params[n], param = ref.parameter, value = param.value;
			if (!value) { continue; }
			str += `${ref.name}: ${serializer.serializeParameterValue(param.owner.xdNode, value, ctx)}, `;
		}
		return str;
	}
}
exports.ExportNode = ExportNode;
