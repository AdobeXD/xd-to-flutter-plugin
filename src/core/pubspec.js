/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

// this is a basic tool for parsing and validating specific elements of a
// pubspec.yaml file. It is not a YAML processor!

class Pubspec {
	constructor(str) {
		this._parseBlocks(str);
	}

	checkFonts(fonts, log) {
		// would be nice if we isolated the `fonts` block, but this works for now.
		let str = this.fields.flutter;
		return this._checkEntries(fonts, str, 'fonts', (o) => RegExp(`^ +- family: +${o} *(?:$|#)`, 'm'), log);
	}

	checkDependencies(names, log) {
		let str = this.fields.dependencies;
		return this._checkEntries(names, str, 'dependencies', (o) => RegExp(`^ +${o}:\\s`, 'm'), log);
	}

	checkAssets(paths, log) {
		// would be nice if we isolated the `assets` block, but this works for now.
		let str = this.fields.flutter;
		return this._checkEntries(paths, str, 'assets', (o) => RegExp(`^ +- +${o} *(?:$|#)`, 'm'), log);
	}

	_parseBlocks(str) {
		let fields = this.fields = {}, l = str.length, prev;
		let re = /^([-\w]+):\s/gm, o = re.exec(str);
		while (prev = o) {
			o = re.exec(str);
			fields[prev[1]] = str.slice(prev.index + prev[0].length, o ? o.index-1 : l);
		}
	}

	_checkEntries(arr, str, noun, regexpBuilder, log) {
		if (!arr || !arr.length) { return true; }
		if (!str) {
			log && log.warn(`Could not find ${noun} entry in pubspec.yaml.`);
			return false;
		}
		let missing = [];
		arr.forEach(o => {
			let re = regexpBuilder(o);
			if (!re.test(str)) { missing.push(o); }
		});
		if (missing.length === 0) { return true; }
		log && log.warn(`Could not find ${noun} entry in pubspec.yaml for: ${missing.join(', ')}.`);
		return false;
	}

	toString() {
		return `[Pubspec fields=${Object.keys(this.fields).join(', ')}]`;
	}
}

module.exports = {
	Pubspec
};