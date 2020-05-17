/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

// Serialization methods related to colors

const $ = require("../utils");

function getColorString(color) {
	return "const Color(0x" + $.getARGBHexWithOpacity(color, 1.0) + ")";
}
exports.getColorString = getColorString;

function getColorWithOpacityString(color, opacity) {
	return "const Color(0x" + $.getARGBHexWithOpacity(color, opacity) + ")";
}
exports.getColorWithOpacityString = getColorWithOpacityString;