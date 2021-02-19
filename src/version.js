/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/


const app = require("application");
const { alert } = require("./ui/alert");

// Update for new builds:
exports.version = "1.1.0";
exports.debug = false;
exports.xdVersionRequired = 30; // the actual minimum XD version required to run the plugin.

// Calculated:
exports.xdVersion = parseInt(app.version);
exports.xdVersionOk = (exports.xdVersion >= exports.xdVersionRequired);
exports.label = exports.debug ? 'DEBUG' : 'Release';

// Methods:
function checkXDVersion() {
	if (exports.xdVersionOk) { return true; }
	alert(
		`XD to Flutter plugin (v${exports.version}) requires Adobe XD version ` +
		`${exports.xdVersionRequired} or higher.` +
		`<br><br>Current version is ${app.version}. Please upgrade.`
	);
	return false;
}
exports.checkXDVersion = checkXDVersion;