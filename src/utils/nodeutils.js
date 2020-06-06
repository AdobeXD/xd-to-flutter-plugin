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
const $ = require("./utils");
const PropType = require("../core/proptype");


function getContainingComponent(xdNode, inclusive=false) {
	if (!xdNode || xdNode === xd.root) { return null; }
	if (inclusive && xdNode instanceof xd.SymbolInstance) { return xdNode; }
	return getContainingComponent(xdNode.parent, true);
}
exports.getContainingComponent = getContainingComponent;

function getOpacity(xdNode) {
	// TODO: CE: Calculate opacity based off of parents compositing mode (whether or not it exports a blend mask widget that has it's own opacity and forces compositing)
	let o = xdNode, opacity = 1.0;
	while (o) {
		if (o.opacity != null) { opacity *= o.opacity; }
		o = o.parent;
	}
	return opacity;
}
exports.getOpacity = getOpacity;

function getProp(xdNode, prop) {
    let o = xdNode.pluginData;
    return o && o[prop];
}
exports.getProp = getProp;

function setProp(xdNode, prop, value) {
	let o = xdNode.pluginData || {};
	o[prop] = value;
	xdNode.pluginData = o;
}
exports.setProp = setProp;

function getFlutterFont(font) {
    let o = xd.root.pluginData;
    return (o && o.fontMap && o.fontMap[font]) || null;
}
exports.getFlutterFont = getFlutterFont;

function setFlutterFont(xdFont, flutterFont) {
    let o = xd.root.pluginData || {};
    if (!o.fontMap) { o.fontMap = {}; }
    o.fontMap[xdFont] = flutterFont;
    xd.root.pluginData = o;
}
exports.setFlutterFont = setFlutterFont;

function getWidgetName(xdNode) {
	if (!isWidget(xdNode)) { return null; }
	let name = getProp(xdNode, PropType.WIDGET_NAME) || getDefaultWidgetName(xdNode);
    return $.cleanVarName(_getWidgetPrefix() + name);
}
exports.getWidgetName = getWidgetName;

function getDefaultWidgetName(xdNode) {
	if (!isWidget(xdNode)) { return null; }
    return $.cleanVarName(xdNode.name);
}
exports.getDefaultWidgetName = getDefaultWidgetName;

function _getWidgetPrefix() {
	// TODO: GS: the default value should be moved to a constant somewhere.
	let o = xd.root.pluginData;
	return o ? o[PropType.WIDGET_PREFIX] || '' : 'XD';
}

function isWidget(xdNode) {
	// returns true if the xdNode is an exportable widget.
	return xdNode instanceof xd.Artboard || (xdNode instanceof xd.SymbolInstance && xdNode.isMaster);
}
exports.isWidget = isWidget;

function getImageName(xdNode) {
	if (!xdNode.fill) { return null; }
    let name, hash = getImageHash(xdNode);
    if (hash) {
        let o = xd.root.pluginData;
        name = o && o.imageMap && o.imageMap[getImageHash(xdNode)];
    }
    return name || getProp(xdNode, PropType.IMAGE_FILL_NAME) || null;
}
exports.getImageName = getImageName;

function setImageName(xdNode, name) {
    let hash = getImageHash(xdNode);
    if (hash) {
		// set in both the global hash, and on the instance
		// in case a future version of XD breaks the hash again.
        let o = xd.root.pluginData || {};
        if (!o.imageMap) { o.imageMap = {}; }
        o.imageMap[getImageHash(xdNode, true)] = name;
        xd.root.pluginData = o;
    }
    setProp(xdNode, PropType.IMAGE_FILL_NAME, name);
}
exports.setImageName = setImageName;

function setState(xdNode, value){
    xdNode.pluginData = value;
}
exports.setState = setState;

function getState(xdNode){
    return xdNode.pluginData || {};
}
exports.getState = getState;

function getImageHash(xdNode) {
	// This only works on images that have been dragged into XD from the file system.
	// TODO: GS: update once an ImageFill.hashcode property becomes available.
	let path = _getImageFillName(xdNode.fill);
	return path ? $.getHash(path) : null;
}
exports.getImageHash = getImageHash;

function _getImageFillName(fill) {
	if (!fill) { return null; }
	// this is a huge hack, because ImageFill doesn't have a .file property
	let fillStr = fill.toString().replace(/\\/g, '/');
	// as of XD29, this returns a file name & dimensions
	let match = /ImageFill\(([^<][^(]+)\)/.exec(fillStr);
	return match ? match[1] : null;
}

function getShapeDataName(shape, ctx) {
	return $.cleanVarName(`_svg_${shape.getSvgId(ctx)}`);
}
exports.getShapeDataName = getShapeDataName;
