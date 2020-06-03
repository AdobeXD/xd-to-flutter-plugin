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

const $ = require("../utils/utils");
const { Log } = require("./log");
const { trace } = require('../utils/debug');

const ContextTarget = {
	FILES: 1,
	CLIPBOARD: 2,
}
exports.ContextTarget = ContextTarget;

class ExportFile {
	constructor(fileName) {
		this.fileName = fileName;
		this.imports = {};
		this.shapeData = {};
	}

	addImport(name, isWidgetImport, scope) {
		this.imports[name] = { name: name, isWidgetImport: isWidgetImport, scope: scope };
	}

	addShapeData(shape) {
		// TODO: GS: Switching this to use a unique shape ID (NOT svgId) could simplify a few things
		this.shapeData[shape.xdNode.guid] = shape;
	}

	removeShapeData(shape) {
		delete(this.shapeData[shape.xdNode.guid]);
	}
}

class Context {

	constructor(target) {
		this._debugLog = new Log();
		this._userLog = new Log();
		this.log = this._userLog;
		this.widgetNameSet = {};
		this.artboards = {};
		this.masterComponents = {};
		this.componentInstances = {};
		this.target = target;
		this.files = {};
		this.fileStack = [];
		this.resultMessage = null;
		this._fonts = {};
	}

	useDebugLog() {
		this.log = this._debugLog;
	}

	useUserLog() {
		this.log = this._userLog;
	}

	get _currentFile() {
		if (this.fileStack.length > 0)
			return this.fileStack[this.fileStack.length - 1];
		return null;
	}

	pushFile(fileName) {
		let file = this.files[fileName] || new ExportFile(fileName);
		if (fileName) { this.files[fileName] = file; }
		this.fileStack.push(file);
	}

	popFile() {
		this.fileStack.pop();
	}

	addArtboard(node) {
		if (!this._checkWidgetName(node)) { return; }
		this.artboards[node.symbolId] = node;
		this.widgetNameSet[node.widgetName] = true;
	}

	addFont(font, xdNode) {
		// currently not using xdNode, but it's passed in so we can report it if needed.
		this._fonts[font] = true;
	}

	get fonts() {
		return Object.keys(this._fonts);
	}

	addComponentInstance(node) {
		let instances = this.componentInstances[node.symbolId];
		if (!instances) { instances = this.componentInstances[node.symbolId] = []; }
		if (node.isMaster && !this._checkWidgetName(node)) { return; }
		// Check if it's already in the instance list:
		for (let i = 0; i < instances.length; ++i) {
			if (instances[i].xdNode === node.xdNode) { return; }
		}
		instances.push(node);
		if (node.isMaster) {
			this.masterComponents[node.symbolId] = node;
			this.widgetNameSet[node.widgetName] = true;
		}
	}

	getComponentFromXdNode(xdNode) {
		let instances = this.componentInstances[xdNode.symbolId];
		for (let i = 0; instances && i < instances.length; ++i) {
			let instance = instances[i];
			// Comparing using equality to test if these xdNodes are the same reference
			if (instance.xdNode === xdNode) { return instance; }
		}
		return null;
	}

	getArtboardFromXdNode(xdNode) {
		return this.artboards[xdNode.guid];
	}

	addImport(name, isWidgetImport, scope) {
		if (this._currentFile) {
			this._currentFile.addImport(name, isWidgetImport, scope);
			//trace(`added import ${name} to file ${this._currentFile.fileName}`);
		} else {
			//trace(`didn't add import ${name} because there was no current file`);
		}
	}

	addShapeData(node) {
		if (this._currentFile) {
			this._currentFile.addShapeData(node);
		} else {
			trace(`Didn't add path data ${node.xdNode.name} because there was no current file.`);
		}
	}

	removeShapeData(node) {
		this._currentFile && this._currentFile.removeShapeData(node);
	}

	usesUI() {
		this.addImport("dart:ui", false, "ui");
	}

	usesSVG() {
		this.addImport("package:flutter_svg/flutter_svg.dart", false);
	}

	usesGradientXDTransform() {
		this.addImport("package:adobe_xd/gradient_xd_transform.dart", false);
	}

	// Post process data gathered during the parse stage and seal the object
	finish() {
		Object.freeze(this);
	}

	logArtboardsAndComponents() {
		Object.values(this.artboards).forEach((a, i) => trace(a));
		Object.values(this.masterComponents).forEach((c, i) => trace(c));
	}

	_checkWidgetName(node) {
		let name = node.widgetName;
		if (!name) {
			this.log.error(`Empty widget name.`, node.xdNode);
			return false;
		}
		if (this.widgetNameSet[name]) {
			this.log.error(`Duplicate widget name: ${name}.`, node.xdNode);
			return false;
		}
		return true;
	}

}

exports.Context = Context;
