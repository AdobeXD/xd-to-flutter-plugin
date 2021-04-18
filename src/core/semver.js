/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

// Temporary test harness: https://jsfiddle.net/10Lra6jg/8/

class SemVer {
	constructor(low, high, isValid=true) {
		this._low = low;
		this._high = high;
		this._isValid = (low == null || low.isValid) && (high == null || high.isValid) && isValid !== false;
	}

	get isValid() {
		return this._isValid &&
			!(this._high && !this._low) && // invalid if it has a high, but not a low
			(this._high == null || this._low.isLessThan(this._high)); // valid if low < high
	}

	isSatisfiedBy(version) {
		version = Version.parse(version);
		if (!version || !version.isValid || !this.isValid) { return null; }
		if (this._low && this._low.compare(version) > 0) { return false; } // if lowVersion > version, return false
		if (this._high && this._high.compare(version) <= 0) { return false; } // if highVersion <= version, return false
		return true;
	}

	includesAtLeast(version) {
		version = Version.parse(version);
		if (!version || !version.isValid || !this.isValid) { return null; }
		return this._high == null || this._high.compare(version) > 0; // no upper constraint or it's >= version
	}

	requiresAtLeast(version) {
		version = Version.parse(version);
		if (!version || !version.isValid || !this.isValid) { return null; }
		return this._low.compare(version) >= 0; // low is >= version
	}
}

SemVer.getInvalid = function() {
	let o = new SemVer(null, null, false);
	o.isInvalid = true;
	return o;
}

SemVer.parse = function(str) {
	if (str === null || str === "" || /any/i.test(str)) {
		return new SemVer(null, null);
	}
	let v, o = /^[\s'"]*([^'"]+)[\s'"]*$/.exec(str);
	str = o && o[1];
	if (!str) { return false; }
	if (str.charAt(0) === "^") {
		// Caret syntax: ^1.2.3
		v = Version.parse(str.slice(1));
		return new SemVer(v, v.major === 0 ? new Version(0, v.minor+1, 0) : new Version(v.major+1, 0, 0));
	}
	if (/[0-9]/.test(str.charAt(0))) {
		// Concrete version: 1.2.3
		if (/\s/.test(str)) { return SemVer.getInvalid(); } // more than one constraint
		v = Version.parse(str);
		return new SemVer(v, new Version(v.major, v.minor, v.patch+1));
	}
	// comparative: >=1.2.3 <2.0.0
	let low = null, high = null;
	while (true) {
		let re = /^\s*((?:<|>)?=?)\s*([0-9.]+)/, o = re.exec(str);
		if (!o) { break; }
		str = str.slice(o[0].length);
		let constraint = o[1], v = Version.parse(o[2]);
		if (!v.isValid || !constraint || !o[2]) { return SemVer.getInvalid(); }
		if (constraint.charAt(0) === ">") {
			if (low) { return SemVer.getInvalid(); } // already have a lower constraint
			if (constraint.charAt(1) !== "=") { v.patch++; }
			low = v;
		} else {
			if (high) { return SemVer.getInvalid(); } // already have a higher constraint
			if (constraint.charAt(1) === "=") { v.patch++; }
			high = v;
		}
	}
	if (!low & !high) { return SemVer.getInvalid(); } // unable to parse any constraints
	return new SemVer(low, high);
}

class Version {
	constructor(major, minor, patch, build, label) {
		this.major = major;
		this.minor = minor;
		this.patch = patch;
		this.build = build || null;
		this.label = label || null;
	}

	get isValid() {
		return this._isValid(this.major) && this._isValid(this.minor) && this._isValid(this.patch);
	}

	_isValid(val) {
		return !(isNaN(val) || val == null || val !== (val|0));
	}

	isEqual(v) { return this.compare(v) === 0; }
	isGreaterThan(v) { return this.compare(v) > 0; }
	isLessThan(v) { return this.compare(v) < 0; }

	compare(v) {
		// returns +1 if greater, 0 if equal, -1 if less
		let o = this;
		if (o.major > v.major) { return 1; } else if (o.major < v.major) { return -1; }
		if (o.minor > v.minor) { return 1; } else if (o.minor < v.minor) { return -1; }
		if (o.patch > v.patch) { return 1; } else if (o.patch < v.patch) { return -1; }
		return 0; // equal
	}

	get versionString() {
		return `${this.major}.${this.minor}.${this.patch}`;
	}

	get fullVersionString() {
		return this.versionString + (this.build ? '+' + this.build : '') + (this.label ? '-' + this.label : '');
	}

	toString() {
		return `Version[${this.fullVersionString}]`;
	}
}

Version.parse = function(str) {
	if (str instanceof Version) { return str; }
	let o = /\s*v?([^-+\s]+)\s*(?:\+([^-]+))?\s*-?\s*(.*)/.exec(str);
	if (!o || o[1] == null) { return new Version(); }
	let version = o[1], build = o[2], label = o[3];
	let parts = version && version.split(".").map((s) => parseInt(s));
	return new Version(parts[0], parts[1], parts[2], build, label);
}


module.exports = {
	Version, SemVer
};
