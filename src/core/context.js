/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const { Log } = require("./log");
const { trace } = require('../utils/debug');

const ContextTarget = {
	FILES: 1,
	CLIPBOARD: 2,
}
exports.ContextTarget = ContextTarget;

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
		this.widgets = {};
		this.widgetStack = [];
		this.resultMessage = null;
		this._gridDepth = 0;
		this._fonts = {};
	}

	get fonts() {
		return Object.keys(this._fonts);
	}

	get _currentWidget() {
		let stack = this.widgetStack, l = stack.length;
		return l > 0 ? stack[l-1] : null;
	}

	useDebugLog() {
		this.log = this._debugLog;
	}

	useUserLog() {
		this.log = this._userLog;
	}

	pushGrid() {
		this._gridDepth++;
	}
	popGrid() {
		this._gridDepth--;
	}
	
	get inGrid() { return this._gridDepth > 0; }

	pushWidget(node) {
		this.widgets[node.widgetName] = node;
		this.widgetStack.push(node);
	}

	popWidget() {
		this.widgetStack.pop();
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

	addImport(name, isWidget, scope) {
		let widget = this._currentWidget;
		if (widget) { widget.addImport(name, isWidget, scope); }
	}

	usesPinned() {
		this.addImport("package:adobe_xd/pinned.dart");
	}

	addShapeData(node) {
		let widget = this._currentWidget;
		if (widget) {
			widget.addShapeData(node);
			this.addImport("package:flutter_svg/flutter_svg.dart");
		}
	}

	removeShapeData(node) {
		let widget = this._currentWidget;
		if (widget) { widget.removeShapeData(node); }
	}

	addParam(param) {
		let widget = this._currentWidget;
		if (!this.inGrid && widget) { widget.addChildParam(param, this); }
	}

	// Post process data gathered during the parse stage and seal the object
	finish() {
		Object.freeze(this);
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
