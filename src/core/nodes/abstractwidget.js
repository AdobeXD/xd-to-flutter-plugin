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

const NodeUtils = require("../../utils/nodeutils");

const { AbstractNode } = require("./abstractnode");
const { ContextTarget } = require("../context");
const PropType = require("../proptype");
const { REQUIRED_PARAM } = require("../constants");

// Base class for nodes that create new Widgets (ex. components or artboards)
// TODO: should this extend Group?
class AbstractWidget extends AbstractNode {

	constructor(xdNode, ctx) {
		super(xdNode, ctx);
		this.children = [];
		this._childParameters = {};
		this._buildMethods = {};
		this._memberNames = {};
		this._shapeData = {};
		this._imports = {};
	}

	get symbolId() {
		return this.xdNode.symbolId;
	}

	get widgetName() {
		return NodeUtils.getWidgetName(this.xdNode);
	}

	serialize(ctx) {
		// serialize a widget instance. Bypass cache & _decorate.
		return this._serialize(ctx);
	}

	serializeWidget(ctx) {
		// serialize the widget class
		ctx.pushWidget(this);
		let params = this._childParameters, propStr = "", paramStr = "";
		let nullsafe = !!NodeUtils.getProp(xd.root, PropType.NULL_SAFE);
		for (let n in params) {
			let param = params[n], value = param.value, required = false;
			if (param.value === REQUIRED_PARAM) {
				required = true;
				value = null;
			}
			if (required) { paramStr += `${nullsafe ? "" : "@"}required `; }
			paramStr += `this.${param.name}${value ? ` = ${value}` : ""}, `;
			propStr += `final ${param.type}${nullsafe && !required && !value ? "?" : ""} ${param.name};\n`;
		}

		let bodyStr = this._serializeWidgetBody(ctx);
		let importStr = this._getImportListString(ctx);
		let shapeDataStr = this._getShapeDataProps(ctx);
		let buildMethodsStr = this._getBuildMethods(ctx);
		let str = importStr + "\n" +
			`class ${this.widgetName} extends StatelessWidget {\n` +
				propStr +
				`${this.widgetName}({ Key${nullsafe ? "?" : ""} key, ${paramStr}}) : super(key: key);\n` +
				`@override\nWidget build(BuildContext context) { return ${bodyStr}; }` +
				buildMethodsStr +
			"}\n" +
			shapeDataStr;

		ctx.popWidget();
		return str;
	}

	addBuildMethod(name, str, ctx) {
		this._checkMemberName(name, "build method", ctx);
		this._buildMethods[name] = str;
	}

	addShapeData(shape) {
		// TODO: GS: Switching this to use a unique shape ID (NOT svgId) could simplify a few things
		this._shapeData[shape.xdNode.guid] = shape;
	}

	removeShapeData(shape) {
		delete(this._shapeData[shape.xdNode.guid]);
	}

	addImport(name, isWidget, scope) {
		this._imports[name] = {name, isWidget, scope};
	}

	addChildParam(param, ctx) {
		// TODO: check for duplicate member names.
		if (!param || !param.name) { return; }
		this._checkMemberName(param.name, `parameter of type ${param.type}`, ctx);
		this._childParameters[param.name] = param;
	}

	_checkMemberName(name, type, ctx) {
		let t = this._memberNames[name];
		if (t && t === type) {
			ctx.log.warn(`A ${type} name was assigned twice on '${this.widgetName}': ${name}`);
		} else if (t && t !== type) {
			ctx.log.error(`A ${type} was assigned with the same name as a ${t} on '${this.widgetName}': ${name}`);
			//ctx.log.warn(`Duplicate member name (param) on '${this.widgetName}': ${name}.`);
		}
		this._memberNames[name] = type;
	}

	_serializeWidgetBody(ctx) {
		throw("_serializeWidgetBody must be implemented.");
	}

	_getBuildMethods(ctx) {
		let str = "", o = this._buildMethods;
		for (let n in o) {
			str += `\n\nWidget ${n}(context) {\nreturn ${o[n]};\n}`
		}
		return str;
	}

	_getShapeDataProps(ctx) {
		let str = "", names = {};
		for (let [k, node] of Object.entries(this._shapeData)) {
			const name = NodeUtils.getShapeDataName(node, ctx);
			if (names[name]) { continue; }
			names[name] = true;
			str += `const String ${name} = '${node.toSvgString(ctx)}';\n`;
		}
		return str;
	}

	_getImportListString(ctx) {
		let str = "import 'package:flutter/material.dart';\n";
		let imports = this._imports;
		for (let n in imports) {
			let o = imports[n];
			if (ctx.target === ContextTarget.FILES || !o.isWidgetImport) {
				str += `import '${o.name}'${o.scope ?  `as ${o.scope}` : ''};\n`;
			}
		}
		return str;
	}

	_getParamList(ctx) {
		let str = "", params = this._childParameters;
		for (let n in params) {
			let param = params[n], value = param.value;
			str += value ? `${param.name}: ${value}, ` : "";
		}
		return str;
	}
}
exports.AbstractWidget = AbstractWidget;

