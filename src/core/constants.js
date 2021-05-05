/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

// a collection of miscellaneous constants that don't warrant their own files.
let ExportMode = Object.freeze({
	INLINE: "inline",
	METHOD: "method",
	BUILDER: "builder",
	CUSTOM: "custom"
});
exports.ExportMode = ExportMode;

exports.ExportModeOptions = [
	{id: ExportMode.INLINE, label: "Export as inline code (default)"},
	{id: ExportMode.METHOD, label: "Export as build method"},
	{id: ExportMode.BUILDER, label: "Replace with builder param"},
	{id: ExportMode.CUSTOM, label: "Replace with custom code"},
];

exports.DEFAULT_CUSTOM_CODE = "Text('Hello World')";
exports.DEFAULT_CLASS_PREFIX = "XD";
exports.DEFAULT_COLORS_CLASS_NAME = "XDColors";
exports.DEFAULT_CHAR_STYLES_CLASS_NAME = "XDTextStyles";
exports.HELP_URL = "https://github.com/AdobeXD/xd-to-flutter-plugin/blob/master/README.md";
exports.REQUIRED_PARAM = {_:"required param"};


