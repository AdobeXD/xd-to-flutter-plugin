/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const $ = require('./utils');
const { trace } = require('./trace');

class Log {
	constructor() {
		this.entries = {};
	}

	add(message, severity = LogSeverity.NOTE, xdNode = null, type = LogType.NONE) {
		if (xdNode) {
			message = `[${$.shorten(xdNode.name, 20)}] ${message}`;
		}
		let entry = new Entry(message, severity, type);
		let o = this.entries[entry.hash] = (this.entries[entry.hash] || entry);
		o.count += 1;
		return o;
	}

	note(message, xdNode, type) {
		let o = this.add(message, LogSeverity.NOTE, xdNode, type);
		trace(o.toString());
	}

	warn(message, xdNode, type) {
		this.add(message, LogSeverity.WARNING, xdNode, type);
	}

	error(message, xdNode, type) {
		this.add(message, LogSeverity.ERROR, xdNode, type);
	}

	fatal(message, xdNode, type) {
		this.add(message, LogSeverity.FATAL, xdNode, type);
	}

	getResults() {
		let entries = this.entries, results = {warnings:[], errors:[]}
		for (let n in entries) {
			let o = entries[n], severity = o.severity;
			if (severity === LogSeverity.WARNING) { results.warnings.push(o); }
			else if (severity === LogSeverity.ERROR) { results.errors.push(o); }
		}
		return results;
	}
}
exports.Log = Log;

class Entry {
	constructor(message, severity = LogSeverity.NOTE, type = LogType.NONE) {
		this.message = message;
		this.type = type;
		this.severity = severity;
		this.count = 0;
		this.hash = $.getHash(`${this.message}${this.type}${this.severity}`);
	}

	toString() {
		return this.message + (this.count > 1 ? ` (x${this.count})` : '');
	}
}

const LogSeverity = Object.freeze({
	NOTE: 0, // Not surfaced to user, dev log.
	WARNING: 1, // Surfaced as warning.
	ERROR: 2, // Surfaced as error.
	FATAL: 3, // Unlikely to be used. Plugin is in an unrecoverable state.
	BLACKWATCH_PLAID: 11, // Pee pee pants
});

// TODO: GS: should we just remove this for now?
const LogType = Object.freeze({
	NONE: 0,
	UNKNOWN: 1,
	PARSE: 2,
	SETTING: 3,
	WRITE: 4,
});
exports.LogType = LogType;
