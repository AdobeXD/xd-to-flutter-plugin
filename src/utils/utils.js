/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

function fix(num, digits=1) {
	let p = Math.pow(10, digits);
	num = Math.round(num * p) / p;
	return num + (num === (num|0) ? '.0' : '');
}
exports.fix = fix;

function capitalize(str) {
	return str[0].toUpperCase() + str.substr(1);
}
exports.capitalize = capitalize;

function shorten(str, length) {
	return str && str.length > length ? str.substr(0, length-1) + "…" : str;
}
exports.shorten = shorten;

function getColorComponent(val) {
	return (val < 0x10 ? "0" : "") + Math.round(val).toString(16);
}
exports.getColorComponent = getColorComponent;

function getARGBHexWithOpacity(color, opacity=1) {
	return getColorComponent(color.a * opacity) +
		getColorComponent(color.r) +
		getColorComponent(color.g) +
		getColorComponent(color.b);
}
exports.getARGBHexWithOpacity = getARGBHexWithOpacity;

function getRGBHex(color) {
	return getColorComponent(color.r) +
		getColorComponent(color.g) +
		getColorComponent(color.b);
}
exports.getRGBHex = getRGBHex;

function delay(t) {
	return new Promise(f => setTimeout(f, t));
}
exports.delay = delay;

function buildMap(arr, value=true) {
	return arr.reduce((o,s) => (o[s] = value, o), {});
}
exports.buildMap = buildMap;

exports.DART_RESERVED_WORDS = [
	// reserved words:
	"assert", "break", "case", "catch", "class", "const", "continue", "default",
	"do", "else", "enum", "extends", "false", "final", "finally", "for", "if", "in",
	"is", "new", "null", "rethrow", "return", "super", "switch", "this", "throw",
	"true", "try", "var", "void", "while", "with",
	// keywords:
	"async", "hide", "on", "show", "sync",
	// identifiers:
	"abstract", "as", "covariant", "deferred", "export", "factory",
	"Function", "get", "implements", "import", "interface", "library", "mixin",
	"operator", "part", "set", "static", "typedef",
	"await", "yield",
	// types:
	"bool", "double", "dynamic", "int", "List", "Map", "String",
];

exports.DART_RESERVED_WORDS_MAP = buildMap(exports.DART_RESERVED_WORDS);

function cleanVarName(name) {
	if (!name) { return ''; }
	name = name.replace(/^[\W\d]+|\W/ig, '');
	if (exports.DART_RESERVED_WORDS_MAP[name]) { name += "_"; }
	return name;
}
exports.cleanVarName = cleanVarName;

function cleanFileName(name) {
	// remove bad chars including /
	return name.replace(/[\/\\:*?"<>|#]]+/ig, '');
}
exports.cleanFileName = cleanFileName;

function cleanPath(path) {
	// remove bad chars & leading or trailing /
	return path.replace(/^\/|\/$|[\\:*?"<>|#]+/g, '');
}
exports.cleanPath = cleanPath;

function getParamList(arr) {
	let str = '';
	arr.forEach((o) => { if (o) { str += o; } });
	return str;
}
exports.getParamList = getParamList;

function getParamDelta(defaultParams, params) {
	// Compares an array of params to an array of default params,
	// and returns a new array containing only the entries that differ,
	// or null if there is no difference.
	let delta = null;
	for (let i=0; i<params.length; i++) {
		if (defaultParams[i] === params[i]) { continue; }
		if (delta === null) { delta = []; }
		delta.push(params[i]);
	}
	return delta;
}
exports.getParamDelta = getParamDelta;

function escapeString(str) {
	return str.replace(/(['\\$])/g, '\\$1') // escaped characters
		.replace(/\n/g, '\\n'); // line breaks
}
exports.escapeString = escapeString;

function getSelectedItem(selection){
	return selection.items.length === 1 ? selection.items[0] : null;
}
exports.getSelectedItem = getSelectedItem;

function enumName(enumeration, value) {
	for (let [k, v] of Object.entries(enumeration)) {
		if (v == value) {
			return k;
		}
	}
	return "";
}
exports.enumName = enumName;

function getHash(str) {
	let hash = 0;
	for (let i = 0; i < str.length; ++i) {
		// Original fn: h = c + (h << 6) + (h << 16) - h
		// Idk if the bit version or multiply version is faster, it probably doesn't matter
		hash = hash * 65599 + str.charCodeAt(i) | 0; // Prime multiply, add character to hash, convert to int
	}
	return hash;
}
exports.getHash = getHash;

function getExportAllMessage(count, total, noun) {
	let s = total === 1 ? '' : 's';
	if (total === 0) { return `No ${noun}s found to export`; }
	if (count === total) { return `Exported ${count} ${noun}${s}`; }
	if (count > 0) { return `Exported ${count} of ${total} ${noun}${s}`; }
	return `Failed to export ${total} ${noun}${s}`;
}
exports.getExportAllMessage = getExportAllMessage;


function isIdentityTransform(o) {
	// unused.
	return (o.a === 1 && o.b === 0 && o.c === 0 && o.d === 1 && o.e === 0 && o.f === 0);
}