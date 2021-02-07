/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const $ = require('../utils/utils');
const { trace } = require('../utils/debug');
const version = require("../version");

class Log {
	constructor(message) {
		this.entries = {};
		this.log = [];
		this.startTime = Date.now();
		message && this.add(message);
	}

	add(message, severity = LogSeverity.NOTE, xdNode = null) {
		if (xdNode) {
			message = `[${$.shorten(xdNode.name, 20)}] ${message}`;
		}
		let entry = new Entry(message, severity);
		this.log.push(entry);
		let o = this.entries[entry.hash] = (this.entries[entry.hash] || entry);
		o.count += 1;
		return o;
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

	dump(message) {
		// if in debug mode, this ends the log and traces the result.
		if (!version.debug) { return; }
		this.add("Complete" + (message ? ": " + message : ""));
		let str = "", log = this.log, t = this.startTime;
		for (let i=0; i<log.length; i++) {
			let o = log[i];
			str += (o.time - t + "ms").padStart(7, " ") + " ";
			str += ("".padStart(o.severity, "*")).padEnd(4, " ");
			str += o.message + "\n";
		}
		trace(str);
	}

	// These methods should always have a void return, so they can be included in an empty return.
	note(message, xdNode) {
		this.add(message, LogSeverity.NOTE, xdNode);
	}

	warn(message, xdNode) {
		this.add(message, LogSeverity.WARNING, xdNode);
	}

	error(message, xdNode) {
		this.add(message, LogSeverity.ERROR, xdNode);
	}

	fatal(message, xdNode) {
		this.add(message, LogSeverity.FATAL, xdNode);
	}
}
exports.Log = Log;

class Entry {
	constructor(message, severity = LogSeverity.NOTE) {
		this.message = message;
		this.severity = severity;
		this.count = 0;
		this.hash = $.getHash(`${this.message}${this.severity}`);
		this.time = Date.now();
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
