/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const NodeUtils = require("../../utils/nodeutils");
const { getParamValue } = require("../../utils/exportutils");

const { ExportNode } = require("./exportnode");
const { ContextTarget } = require("../context");

// Abstract class representing the minimum interface required for an export node.
class ExportWidget extends ExportNode {
	// NodeDecorators should also have a static `create(xdNode, ctx)` method
	// that returns an instance if appropriate for the xdNode.

	constructor(xdNode, ctx) {
		super(xdNode, ctx);
		this.children = [];
		this._childParameters = {};
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
		let params = this._childParameters, propStr = "", paramStr = "";
		for (let n in params) {
			let param = params[n], value = param.value;
			paramStr += `this.${param.name}${value ? ` = ${value}` : ""}, `;
			propStr += `final ${param.type} ${param.name};\n`;
		}

		let importStr = this._getImportListString(ctx);
		let shapeDataStr = this._getShapeDataProps(ctx);

		return importStr + "\n" +
			`class ${this.widgetName} extends StatelessWidget {\n` +
				propStr +
				`${this.widgetName}({ Key key, ${paramStr}}) : super(key: key);\n` +
				`@override\nWidget build(BuildContext context) { return ${this._serializeWidgetBody(ctx)}; }` +
			"}\n" +
			shapeDataStr;
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
		if (!param || !param.name) { return; }
		if (this._childParameters[param.name]) {
			ctx.log.warn(`Duplicate parameter on '${this.widgetName}': ${param.name}.`);
		}
		this._childParameters[param.name] = param;
	}

	_serializeWidgetBody(ctx) {
		throw("_serializeWidgetBody must be implemented.");
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
exports.ExportWidget = ExportWidget;

