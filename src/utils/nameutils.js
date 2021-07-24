/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const $ = require("./utils");

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

exports.DART_RESERVED_WORDS_MAP = $.buildMap(exports.DART_RESERVED_WORDS);

// clean a Dart name without consideration for case:
function cleanDartName(name) {
	if (!name) { return ""; }
	name = name.replace(/^[\W\d]+|\W/ig, '');
	if (exports.DART_RESERVED_WORDS_MAP[name]) { name += "_"; }
	return name;
}
exports.cleanDartName = cleanDartName;

function cleanClassName(name, fixCase=true) {
	if (!fixCase) { return cleanDartName(name); }
	let words = findWords(name), n = "";
   for (let i=0; i<words.length; i++) {
      let word = words[i];
      if (!word) { continue; }
      n += word[0].toUpperCase() + word.slice(1);
   }
   return cleanDartName(n);
}
exports.cleanClassName = cleanClassName;

// just a class name with a lowercase first char:
function cleanIdentifierName(name, fixCase=true) {
   if (!(name = cleanClassName(name, fixCase))) { return name; }
   // TODO: catch things like: ADBTester --> adbTester instead of aDBTester? Less important than for file names
   return name[0].toLowerCase() + name.slice(1);
}
exports.cleanIdentifierName = cleanIdentifierName;

function cleanFileName(name, fixCase=true) {
	// remove bad chars including /
	if (!(name = name.replace(/[\/\\:*?"<>|#]]+/ig, '')) || !fixCase) { return name; }
	let words = findWords(name), n = "", prev;
   for (let i=0; i<words.length; i++) {
      let word = words[i];
      if (!word) { continue; }
      // catch things like: ADBTester --> adb_tester instead of a_d_b_tester
      if (isSingleCap(word) && isSingleCap(prev)) { }
      else if (i > 0) { n += "_"; } 
      prev = word;
      n += word.toLowerCase();
   }
   return n;
}
exports.cleanFileName = cleanFileName;


function pushNonEmpty(arr, val) {
	if (val) { arr.push(val); }
}

function findWords(str) {
   if (!str) { return []; }
   let re = /[-A-Z_ ]/g, arr=[], i=0, o;
   while (o = re.exec(str)) {
      let c = o[0];
      pushNonEmpty(arr, str.slice(i, re.lastIndex-1));
      i = re.lastIndex-1;
      if (c === "-" || c === "_" || c === " ") { ++i; }
   }
   pushNonEmpty(arr, str.slice(i));
   return arr;
}

function isSingleCap(str) {
	if (!str || str.length !== 1) { return false; }
  return str.toLowerCase() !== str;
}