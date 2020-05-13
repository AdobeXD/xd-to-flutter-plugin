/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const xd = require("scenegraph");

const $ = require('../utils');
const serialize = require('../serialize');
const NodeUtils = require("../nodeutils");

const { Parameter, ParameterRef } = require("../parameter");
/*
Notes:
- Line height in XD is a fixed pixel value. In Flutter it is a multiplier of the largest text in a line. This causes differences in rich text with different sizes.
- SingleChildScrollView does not work correctly when in a Transform.
*/

class Text {
	constructor(xdNode) {
		this.xdNode = xdNode;
		this.parameters = {};

		let textParam = new Parameter(this, "String", "text", xdNode.text);
		this.parameters["text"] = new ParameterRef(
			textParam, true, NodeUtils.getProp(xdNode, "textParamName"));

		let colorParam = new Parameter(this, "Color", "fill",  xdNode.fill);
		this.parameters["fill"] = new ParameterRef(
			colorParam, true, NodeUtils.getProp(xdNode, "colorParamName"));
	}

	adjustTransform(mtx) {
		// Flutter applies line height to the first line, XD doesn't.
		let o = this.xdNode, size = o.fontSize, height = o.lineSpacing;
		if (height !== 0) {
			mtx.translate(0, size - height/1.2);
		}
		if (this._offsetX) {
			mtx.translate(this._offsetX, 0);
		}
		if (o.flipY) {
			mtx.translate(0.0, o.localBounds.height);
			mtx.scale(1.0, -1.0);
		}
		return mtx;
	}

	toString(serializer, ctx) {
		let str, o = this.xdNode, params = this.parameters;
		// let hasTextParam = !params["text"].isOwn && !!params["text"].name;

		checkForUnsupportedFeatures(o, ctx);
		ctx.addFont(getFont(o), o);

		if (o.styleRanges.length > 1) {
			str = exportRichText(o, params);
		} else {
			str = exportText(o, params);
		}

		if (o.areaBox) {
			// Area text.
			// don't add padding since the user set an explicit width
			let w = $.fix(o.areaBox.width, 0), h = $.fix(o.areaBox.height, 0);
			// TODO: GS: scrolling does not work correctly for translated widgets.
			if (true || o.clippedByArea) { str = `SingleChildScrollView(child: ${str})`; }
			str = `SizedBox(width: ${w}, height: ${h}, child: ${str},)`;
		} else if (o.textAlign !== xd.Text.ALIGN_LEFT) {
			// To keep it aligned we need a width, with a touch of padding to minimize differences in rendering.
			let w = $.fix(this._padWidth(o.localBounds.width), 0);
			str = `SizedBox(width: ${w}, child: ${str},)`;
		}

		return str;
	}

	_padWidth(w) {
		let o = this.xdNode, pad = Math.max(o.fontSize * 0.25, w * 0.1)|0;
		if (o.textAlign === xd.Text.ALIGN_RIGHT) { this._offsetX = -pad*2; }
		else if (o.textAlign === xd.Text.ALIGN_CENTER) { this._offsetX = -pad; }
		return w + pad * 2;
	}
}


function checkForUnsupportedFeatures(o, ctx) {
	// TODO: GS: Run this against text ranges?
	let xdNode = o;
	if (o.textScript !== 'none') {
		// super / subscript
		ctx.log.warn('Superscript & subscript are not currently supported.', xdNode);
	}
	if (o.textTransform !== 'none') {
		// uppercase / lowercase / titlecase
		ctx.log.warn('Text transformations (all caps, title case, lowercase) are not currently supported.', xdNode);
	}
	if (o.paragraphSpacing) {
		ctx.log.warn('Paragraph spacing is not currently supported.', xdNode);
	}
	if (o.strokeEnabled && o.stroke) {
		// outline text
		ctx.log.warn('Text border is not currently supported.', xdNode);
	}
}

function exportText(xdNode, params) {
	let textParam = params["text"].isOwn
		? `'${$.escapeString(xdNode.text)}'`
		: params["text"].name;
	return 'Text('
		+ `${textParam},` +
		getTextStyle(getStyleParams(xdNode, null, params)) +
		getTextAlign(xdNode) +
		')';
}

function exportRichText(xdNode, params) {
	let text = xdNode.text;
	let styles = xdNode.styleRanges;
	let str = '', j=0;
	let defaultStyleParams = getStyleParams(xdNode, styles[0], params, true);

	for (let i=0; i<styles.length; i++) {
		let style = styles[i], l = style.length;
		if (style.length === 0) { continue; }
		let styleParams = getStyleParams(xdNode, styles[i], params);
		let delta = $.getParamDelta(defaultStyleParams, styleParams);
		if (i === styles.length - 1) { l = text.length - j; } // for some reason, XD doesn't always return the correct length for the last entry.
		str += exportTextSpan(delta, text.substr(j, l)) + ', ';
		j += l;
	}

	// Export a rich text object with an empty root span setting a default style.
	// Child spans set their style as a delta of the default.
	return 'Text.rich(TextSpan(' +
		'  ' + getTextStyle(defaultStyleParams) +
		`  children: [${str}],` +
		`), ${getTextAlign(xdNode)})`;

}

function exportTextSpan(params, text) {
	return 'TextSpan(' +
		` text: '${$.escapeString(text)}',` +
		getTextStyle(params) +
		')';
}

function getTextAlign(xdNode) {
	return `textAlign: ${exportTextAlign(xdNode.textAlign)}, `;
}

function getStyleParams(xdNode, styleRange, params, isDefault=false) {
	// Builds an array of style parameters.
	let o = styleRange || xdNode;
	return [
		getFontFamily(o),
		getFontSize(o),
		getColor(o, params),
		getLetterSpacing(o),
		// The default style doesn't include weight, decoration, or style (italic):
		(isDefault ? null : getFontStyle(o)),
		(isDefault ? null : getFontWeight(o)),
		(isDefault ? null : getTextDecoration(o)),
		// Line height & shadows are set at the node level in XD, so not included for ranges:
		(!styleRange || isDefault  ? getHeight(xdNode) : null),
		(!styleRange || isDefault ? getShadows(xdNode) : null),
	];
}

function getTextStyle(params) {
	if (!params) { return ''; }
	let str = $.getParamList(params);
	return (!str ? '' : `style: TextStyle(${str}), `);
}

function getFont(o) {
	return NodeUtils.getFlutterFont(o.fontFamily) || o.fontFamily;
}

function getFontFamily(o) {
	return `fontFamily: '${getFont(o)}'`;
}

function getFontSize(o) {
	return `fontSize: ${o.fontSize}`;
}

function getColor(o, params) {
	let colorParam = params["fill"].isOwn
		? serialize.getColorWithOpacityString(o.fill, serialize.getOpacity(o))
		: params["fill"].name;
	return `color: ${colorParam}`;
}

function getLetterSpacing(o) {
	// Flutter uses pixel values for letterSpacing.
	// XD uses increments of 1/1000 of the font size.
	return (o.charSpacing === 0 ? '' :
		`letterSpacing: ${o.charSpacing / 1000 * o.fontSize}`);
}

function getFontStyle(o) {
	let style = exportFontStyle(o.fontStyle);
	return (style ? `fontStyle: ${style}` : '');
}

function getFontWeight(o) {
	let weight = exportFontWeight(o.fontStyle);
	return (weight ? `fontWeight: ${weight}` : '');
}

function getTextDecoration(o) {
	let u = o.underline, s = o.strikethrough, count = u + s, str = '';
	if (count === 0) { return str; }
	if (count === 2) {
		str = 'TextDecoration.combine([TextDecoration.underline, TextDecoration.lineThrough])';
	} else {
		str = 'TextDecoration.' + (u ? 'underline' : 'lineThrough');
	}
	return `decoration: ${str}`;
}

function getHeight(o) {
	// XD reports a lineSpacing of 0 to indicate default spacing.
	// Flutter uses a multiplier against the font size for its "height" value.
	// XD uses a pixel value.
	return (o.lineSpacing === 0 ? '' :
		`height: ${o.lineSpacing / o.fontSize}`);
}

function getShadows(xdNode) {
	return (xdNode.shadow === null || !xdNode.shadow.visible ? '' :
		`shadows: [${exportShadow(xdNode.shadow)}]`);
}

function exportShadow(shadow) {
	let o = shadow;
	return `Shadow(color: ${serialize.getColorWithOpacityString(o.color)}, ` +
		(o.x || o.y ? `offset: Offset(${o.x}, ${o.y}), ` : '') +
		(o.blur ? `blurRadius: ${o.blur}, ` : '') + ')';
}

function exportTextAlign(align) {
	// TODO: GS: should we omit this if it's left aligned? May cause issues if there is a default alignment.
	return 'TextAlign.' + (align == 'right' ? 'right' :
		align === 'center' ? 'center' : 'left');
}

// Used to translate font weight names from XD to Flutter constants:
// https://www.webtype.com/info/articles/fonts-weights/
const FONT_WEIGHTS = {
	'thin': 'w100',
	'hairline': 'w100',
	'extralight': 'w200',
	'ultralight': 'w200',
	'light': 'w300',
	'book': 'w300',
	'demi': 'w300',

	'normal': null, // w400
	'regular': null,
	'plain': null,

	'medium': 'w500',
	'semibold': 'w600',
	'demibold': 'w600',
	'bold': 'w700', // or 'bold'
	'extrabold': 'w800',
	'heavy': 'w800',
	'black': 'w900',
	'poster': 'w900',
}

let weightList = [];
for (let n in FONT_WEIGHTS) { weightList.push(n); }
const FONT_WEIGHTS_RE = new RegExp(weightList.join('|'), 'ig');

function exportFontWeight(style) {
	style = style.toLowerCase();
	let match = style.match(FONT_WEIGHTS_RE);
	let val = match && FONT_WEIGHTS[match];
	return val ? 'FontWeight.' + val : null;
}

const FONT_STYLES = {
	'italic': 'italic',
	'oblique': 'italic',
}

let styleList = [];
for (let n in FONT_STYLES) { styleList.push(n); }
const FONT_STYLES_RE = new RegExp(styleList.join('|'), 'ig');

function exportFontStyle(style) {
	style = style.toLowerCase();
	let match = style.match(FONT_STYLES_RE);
	let val = match && FONT_STYLES[match];
	return val ? 'FontStyle.' + val : null;
}

exports.Text = Text;
