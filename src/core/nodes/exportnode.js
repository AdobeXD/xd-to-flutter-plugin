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
	constructor(xdNode) {
		this.xdNode = xdNode;
		this.parameters = null;
		this.childParameters = null;
		this.children = null;
		this._cache = null;
	}

	get hasChildren() {
		return !!(this.children && this.children.length);
	}

	get xdId() {
		return this.xdNode ? this.xdNode.guid : null;
	}

	get xdName() {
		return this.xdNode ? this.xdNode.name : null;
	}

	get responsive() {
		return !!this.xdNode.horizontalConstraints
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
			this._cache = this._serialize(serializer, ctx);
		}
		return this._cache;
	}

	_serialize(serializer, ctx) {
		return "";
	}
}
exports.ExportNode = ExportNode;
