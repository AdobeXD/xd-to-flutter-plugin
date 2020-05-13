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
const assets = require("assets");
const clipboard = require("clipboard");

const { Context, ContextTarget } = require("./context");
const { parse } = require("./parse");
const { Serializer, getFileString, getColorString, getGradientFromAsset, getGradientTypeFromAsset } = require("./serialize");
const { formatDart } = require("../lib/dart_style");
const $ = require("./utils");
const NodeUtils = require("./nodeutils");
const PropType = require("./proptype");
const { project } = require("./project");
const { alert } = require("../ui/alert");

async function copySelected(selection, root) {
	let item = $.getSelectedItem(selection);
	if (!item) { alert("Select a single item to copy."); return; }
	let ctx = new Context(ContextTarget.CLIPBOARD);

	let result, node = parse(root, [ item ], ctx)[0];
	if (node) {
		let serializer = new Serializer();
		result = _formatDart(serializer.getNodeString(node, ctx)+';', true, ctx);
	}

	if (result) {
		clipboard.copyText(result);
		ctx.resultMessage = "Flutter code copied to clipboard";
	} else {
		ctx.resultMessage = "Unable to export this node";
	}
	return ctx;
}

async function exportAll(selection, root) {
	let ctx = new Context(ContextTarget.FILES);

	if (!await project.checkRoot(false)) { return null; }
	let codeF = project.code;

	let count = 0, total = 0;
	// Parse entire document, getting all artboards and components, combining them in one object for iteration
	parse(root, [], ctx);
	let widgets = Object.assign({}, ctx.artboards, ctx.masterComponents);
	// Write each widget to disk
	for (let n in widgets) {
		if (NodeUtils.getProp(widgets[n].xdNode, PropType.INCLUDE_IN_EXPORT_PROJECT) === false)
			continue;
		++total;
		let fileName = await writeWidget(widgets[n], codeF, ctx);
		if (fileName) { count++; }
	}

	await exportColors(ctx);
	await project.validate(ctx);

	ctx.resultMessage = $.getExportAllMessage(count, total, "widget");
	return ctx;
}

async function exportSelected(selection, root) {
	let item = $.getSelectedItem(selection);
	if (!item) { alert("Select a single item or artboard."); return null; }

	if (!(item instanceof xd.Artboard || item instanceof xd.SymbolInstance)) {
		alert("Only Artboards and Components can be exported as Widgets.");
		return null;
	}

	if (!await project.checkRoot()) { return null; }
	let codeF = project.code;

	let ctx = new Context(ContextTarget.FILES);
	let fileName, node = parse(root, [ item ], ctx)[0];
	if (node) {
		// Write the widget we have selected to disk
		fileName = await writeWidget(node, codeF, ctx);
	}

	await project.validate(ctx);

	ctx.resultMessage = fileName ? `Exported '${fileName}' successfully` : "Widget export failed";
	return ctx;
}

//Writes a single artboard / component to dart file
async function writeWidget(node, codeF, ctx) {
	let serializer = new Serializer();
	let fileName = node.widgetName + ".dart";
	let fileContents = _formatDart(getFileString(node, serializer, ctx), false, ctx, node);
	if (!fileContents) { return null; }

	await codeF.writeFile(fileName, fileContents, ctx);
	return fileName;
}

async function exportColors(ctx) {
	if (!NodeUtils.getProp(xd.root, PropType.EXPORT_COLORS)) { return; }
	let entries = assets.colors.get();
	if (!entries) { return; }
	//entries = entries.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase());
	let lists = {}, usedNames = {}, names = [];
	let className = $.cleanClassName(NodeUtils.getProp(xd.root, PropType.COLORS_CLASS_NAME)) || 'XDColors';
	let str = `import 'package:flutter/material.dart';\n\nclass ${className} {\n`;
	for (let i=0, l=entries.length; i<l; i++) {
		let asset = entries[i], name = $.cleanClassName(asset.name);
		if (!name) { continue; }
		if (usedNames[name]) {
			ctx.log.error(`Duplicate color asset name: ${name}`);
			continue;
		}
		usedNames[name] = true;
		names.push(name);
		let isGradient = !asset.color;
		let match = /(.+)(\d+)$/.exec(name);
		if (match) {
			let o = lists[match[1]];
			if (!o) {
				o = lists[match[1]] = [];
				o.isGradient = isGradient;
			}
			if (o.isGradient !== isGradient) {
				ctx.log.warn(`Color asset lists can't mix colors and gradients (${name})`);
			} else {
				o[parseInt(match[2])] = name;
			}
		}
		if (isGradient) {
			let type = getGradientTypeFromAsset(asset);
			str += `\tstatic const ${type} ${name} = ${getGradientFromAsset(asset)};\n`;
		} else {
			str += `\tstatic const Color ${name} = ${getColorString(asset.color)};\n`;
		}
	}
	str += '\n';
	for (let n in lists) {
		let s = _getColorList(lists[n], n, true);
		if (s) { str += `${s}\n`; }
	}
	//str += `\n${_getColorList(names, 'values')}`; // TODO: GS: this needs to account for gradients, and isn't useful now anyway because the order is random
	str += '\n}';
	str = _formatDart(str, false, ctx, null);
	await project.code.writeFile(`${className}.dart`, str, ctx);
}

function _getColorList(o, name, validate) {
	if (validate && (!o[0] || !o[1])) { return ''; }
	let type = o.isGradient ? 'Gradient' : 'Color';
	let str = `\tstatic const List<${type}> ${name} = const [`;
	for (let i=0; true; i++) {
		if (!o[i]) { break; }
		str += `${i===0 ? '' : ', '}${o[i]}`;
	}
	return str + '];';
}

function _formatDart(str, nestInFunct, ctx, node) {
	let result = null, xdNode = node && node.xdNode;
	try {
		result = formatDart(str, nestInFunct);
	} catch(e) {
		ctx.log.error('Unable to format the exported source code.', xdNode);
	}
	return result;
}

module.exports = {
	copySelected,
	exportSelected,
	exportAll,
	exportColors,
};
