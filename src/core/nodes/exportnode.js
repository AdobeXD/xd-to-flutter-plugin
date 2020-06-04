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
		this._cache = null;
	}

	get hasChildren() {
		return !!(this.children && this.children.length);
	}

	get hasDecorators() {
		return !!(this.decorators && this.decorators.length);
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
}
exports.ExportNode = ExportNode;
