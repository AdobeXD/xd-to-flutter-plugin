/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/


// NOTE: if we ever need to write YAML, we should evaluate https://www.npmjs.com/package/yaml
// because it may allow us to preserve comments.
const yaml = require("../lib/js-yaml");
const { SemVer } = require("./semver");

class Pubspec {
	constructor(str, log) {
		this.log = log;
		let err;
		try { this.yaml = yaml.load(str); } catch(e) { err = e; }
		if (!this.yaml) { this._warn(`Unable to parse pubspec.yaml${err ? ': '+ err.reason : ''}`); }
	}

	checkFonts(fonts) {
		if (!this.yaml) { return false; } // already threw a parsing error
		let list = this.yaml.flutter && this.yaml.flutter.fonts;
		let f = (val, o) => o.family === val;
		return this._checkListEntries(fonts, list, 'flutter/fonts', f);
	}

	checkDependencies(names) {
		if (!this.yaml) { return false; }
		return this._checkMapEntries(names, this.yaml.dependencies, 'dependencies');
	}

	checkAssets(paths) {
		if (!this.yaml) { return false; }
		let list = this.yaml.flutter && this.yaml.flutter.assets;
		return this._checkListEntries(paths, list, 'flutter/assets');
	}

	checkNullSafe() {
		let yaml = this.yaml, errs=[];
		if (!yaml) { return null; } // already threw a parsing error

		let sdk = yaml.environment && yaml.environment.sdk;
		let sdkResult = SemVer.parse(sdk).requiresAtLeast("2.1.2");
		if (sdkResult === false) { errs.push("a minimum Dart SDK constraint of 2.1.2 or higher"); }

		let adobe_xd = yaml.dependencies && yaml.dependencies.adobe_xd;
		let xdResult = (!adobe_xd || !!adobe_xd.path) ? null : SemVer.parse(adobe_xd).requiresAtLeast("2.0.0");
		if (xdResult === false) { errs.push("adobe_xd 2.0.0 or higher"); }
		
		if (errs.length) { this._warn(`Null safety requires ${errs.join(" and ")}. Update your pubspec.yaml or disable 'Export Null Safe Code'.`); }
		return xdResult === false || sdkResult === false ? false :
			xdResult === true && sdkResult === true ? true : null;
	}

	_warn(str) {
		this.log && this.log.warn(str);
		return false;
	}

	_logMissingEntry(noun) {
		return this._warn(`Could not find ${noun} entry in pubspec.yaml.`);
	}

	_hasMissingEntries(values, noun) {
		if (!values || values.length === 0) { return true; }
		return this._warn(`Could not find ${noun} entry in pubspec.yaml for: ${values.join(', ')}.`);
	}

	_checkMapEntries(keys, map, noun) {
		// checks for the existence of entries with the specified key names
		if (!map) { return this._logMissingEntry(noun); }
		let missing = [];
		for (let i=0, l=keys.length; i<l; i++) {
			if (!map[keys[i]]) { missing.push(keys[i]); }
		}
		return this._hasMissingEntries(missing, noun);
	}

	_checkListEntries(values, list, noun, comparisonFunction=null) {
		// checks for the existence of entries in list that match the specified values
		// if a comparisonFunction is provided, it is used to determine the match
		if (!list) { return this._logMissingEntry(noun); }
		let missing = [], f = comparisonFunction || ((val, o) => val === o);
		for (let i=0, l=values.length; i<l; i++) {
			if (!this._checkListEntry(values[i], list, f)) { missing.push(values[i]); }
		}
		return this._hasMissingEntries(missing, noun);
	}

	_checkListEntry(value, list, f) {
		for (let i=0, l=list.length; i<l; i++) {
			let o = list[i];
			if (f(value, o)) { return true; }
		}
		return false;
	}
}

module.exports = {
	Pubspec
};