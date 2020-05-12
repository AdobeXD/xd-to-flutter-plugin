const xd = require("scenegraph");
const utils = require("./utils");

const { Parameter } = require("./parameter");
const { Log } = require("./log");
const { trace } = require('./trace');

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

	addShapeData(node) {
		this.shapeData[node.xdNode.guid] = node;
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
		this.files[fileName] = file;
		this.fileStack.push(file);
		this.usesUI();
	}

	popFile() {
		this.fileStack.pop();
	}

	addArtboard(node) {
		if (!node.widgetName) {
			this.log.error(`Empty artboard widget name`, node.xdNode);
			return;
		}
		if (this.widgetNameSet[node.widgetName]) {
			this.log.error(`Duplicate widget names: ${node.widgetName}`, node.xdNode);
			return;
		}
		this.artboards[node.id] = node;
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
		if (!this.componentInstances[node.id])
			this.componentInstances[node.id] = [];
		if (node.isMaster) {
			if (!node.widgetName) {
				// Throw an error we have an empty component name
				this.log.error(`Empty component widget name`, node.xdNode);
				return;
			}
			if (this.widgetNameSet[node.widgetName]) {
				// Throw an error we have a duplicate component name
				this.log.error(`Duplicate widget name: ${node.widgetName}`, node.xdNode);
				return;
			}
		}
		// Is this xdNode is already in the component instances list then don't add it:
		for (let i = 0; i < this.componentInstances[node.id].length; ++i) {
			let inst = this.componentInstances[node.id][i];
			if (inst.xdNode === node.xdNode)
				return;
		}
		this.componentInstances[node.id].push(node);
		if (node.isMaster) {
			this.masterComponents[node.id] = node;
			this.widgetNameSet[node.widgetName] = true;
		}
	}

	getComponentFromXdNode(xdNode) {
		let instances = this.componentInstances[xdNode.symbolId];
		if (instances) {
			for (let i = 0; i < instances.length; ++i) {
				let instance = instances[i];
				// Comparing using equality to test if these xdNodes are the same reference
				if (instance.xdNode === xdNode) {
					return instance;
				}
			}
		}
		return null;
	}

	getArtboardFromXdNode(xdNode) {
		return this.artboards[xdNode.guid];
	}

	addImport(name, isWidgetImport, scope) {
		if (this._currentFile) {
			this._currentFile.addImport(name, isWidgetImport, scope);
			trace(`added import ${name} to file ${this._currentFile.fileName}`);
		} else {
			trace(`didn't add import ${name} because there was no current file`);
		}
	}

	addShapeData(node) {
		if (this._currentFile) {
			this._currentFile.addShapeData(node);
		} else {
			trace(`Didn't add path data ${node.xdNode.name} because there was no current file.`);
		}
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

}

exports.Context = Context;
