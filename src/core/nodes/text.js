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
const NodeUtils = require("../nodeutils");
const { getColor } = require('../serialize/colors');
const { Parameter, ParameterRef } = require("../parameter");
const PropType = require("../proptype");

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
		this.parameters["text"] = new ParameterRef(textParam, true, NodeUtils.getProp(xdNode, PropType.TEXT_PARAM_NAME));

		let colorParam = new Parameter(this, "Color", "fill",  xdNode.fill);
		this.parameters["fill"] = new ParameterRef(colorParam, true, NodeUtils.getProp(xdNode, PropType.COLOR_PARAM_NAME));
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
		ctx.addFont(_getFontFamily(o), o);

		if (o.styleRanges.length > 1) {
			str = _getTextRich(o, params);
		} else {
			str = _getText(o, params);
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

function _getText(xdNode, params) {
	let textParam = params["text"].isOwn
		? `'${$.escapeString(xdNode.text)}'`
		: params["text"].name;
	return 'Text('
		+ `${textParam},` +
		_getStyleParam(_getTextStyleParamList(xdNode, null, params)) +
		_getTextAlignParam(xdNode) +
		')';
}

function _getTextRich(xdNode, params) {
	let text = xdNode.text;
	let styles = xdNode.styleRanges;
	let str = '', j=0;
	let defaultStyleParams = _getTextStyleParamList(xdNode, styles[0], params, true);

	for (let i=0; i<styles.length; i++) {
		let style = styles[i], l = style.length;
		if (style.length === 0) { continue; }
		let styleParams = _getTextStyleParamList(xdNode, styles[i], params);
		let delta = $.getParamDelta(defaultStyleParams, styleParams);
		if (i === styles.length - 1) { l = text.length - j; } // for some reason, XD doesn't always return the correct length for the last entry.
		str += _getTextSpan(delta, text.substr(j, l)) + ', ';
		j += l;
	}

	// Export a rich text object with an empty root span setting a default style.
	// Child spans set their style as a delta of the default.
	return 'Text.rich(TextSpan(' +
		'  ' + _getStyleParam(defaultStyleParams) +
		`  children: [${str}],` +
		`), ${_getTextAlignParam(xdNode)})`;

}

// TODO: GS: Evaluate moving all of these into a serialize/text.js file.
function _getTextSpan(params, text) {
	return 'TextSpan(' +
		` text: '${$.escapeString(text)}',` +
		_getStyleParam(params) +
		')';
}

function _getTextAlignParam(xdNode) {
	return `textAlign: ${_getTextAlign(xdNode.textAlign)}, `;
}

function _getTextStyleParamList(xdNode, styleRange, params, isDefault=false) {
	// Builds an array of style parameters.
	let o = styleRange || xdNode;
	return [
		_getFontFamilyParam(o),
		_getFontSizeParam(o),
		_getColorParam(o, params),
		_getLetterSpacingParam(o),
		// The default style doesn't include weight, decoration, or style (italic):
		(isDefault ? null : _getFontStyleParam(o)),
		(isDefault ? null : _getFontWeightParam(o)),
		(isDefault ? null : _getTextDecorationParam(o)),
		// Line height & shadows are set at the node level in XD, so not included for ranges:
		(!styleRange || isDefault  ? _getHeightParam(xdNode) : null),
		(!styleRange || isDefault ? _getShadowsParam(xdNode) : null),
	];
}

function _getStyleParam(params) {
	if (!params) { return ''; }
	let str = $.getParamList(params);
	return (!str ? '' : `style: TextStyle(${str}), `);
}

function _getFontFamily(o) {
	return NodeUtils.getFlutterFont(o.fontFamily) || o.fontFamily;
}

function _getFontFamilyParam(o) {
	return `fontFamily: '${_getFontFamily(o)}', `;
}

function _getFontSizeParam(o) {
	return `fontSize: ${o.fontSize}, `;
}

function _getColorParam(o, params) {
	return `color: ${params["fill"].isOwn
		? getColor(o.fill, NodeUtils.getOpacity(o))
		: params["fill"].name}, `;
}

function _getLetterSpacingParam(o) {
	// Flutter uses pixel values for letterSpacing.
	// XD uses increments of 1/1000 of the font size.
	return (o.charSpacing === 0 ? '' :
		`letterSpacing: ${o.charSpacing / 1000 * o.fontSize}, `);
}

function _getFontStyleParam(o) {
	let style = _getFontStyle(o.fontStyle);
	return style ? `fontStyle: ${style}, ` : '';
}

function _getFontWeightParam(o) {
	let weight = _getFontWeight(o.fontStyle);
	return weight ? `fontWeight: ${weight}, ` : '';
}

function _getTextDecorationParam(o) {
	let u = o.underline, s = o.strikethrough, str = '';
	if (!u && !s) { return str; }
	if (u && s) {
		str = 'TextDecoration.combine([TextDecoration.underline, TextDecoration.lineThrough])';
	} else {
		str = 'TextDecoration.' + (u ? 'underline' : 'lineThrough');
	}
	return `decoration: ${str}, `;
}

function _getHeightParam(o) {
	// XD reports a lineSpacing of 0 to indicate default spacing.
	// Flutter uses a multiplier against the font size for its "height" value.
	// XD uses a pixel value.
	return (o.lineSpacing === 0 ? '' :
		`height: ${o.lineSpacing / o.fontSize}, `);
}

function _getShadowsParam(xdNode) {
	return (xdNode.shadow === null || !xdNode.shadow.visible ? '' :
		`shadows: [${_getShadow(xdNode.shadow)}], `);
}

function _getShadow(shadow) {
	let o = shadow;
	return `Shadow(color: ${getColor(o.color)}, ` +
		(o.x || o.y ? `offset: Offset(${o.x}, ${o.y}), ` : '') +
		(o.blur ? `blurRadius: ${o.blur}, ` : '') + ')';
}

function _getTextAlign(align) {
	// TODO: GS: should we omit this if it's left aligned? May cause issues if there is a default alignment.
	return 'TextAlign.' + (align == 'right' ? 'right' :
		align === 'center' ? 'center' : 'left');
}

function _getFontStyle(style) {
	style = style.toLowerCase();
	let match = style.match(FONT_STYLES_RE);
	let val = match && FONT_STYLES[match];
	return val ? 'FontStyle.' + val : null;
}

function _getFontWeight(style) {
	style = style.toLowerCase();
	let match = style.match(FONT_WEIGHTS_RE);
	let val = match && FONT_WEIGHTS[match];
	return val ? 'FontWeight.' + val : null;
}

function _buildStyleRegExp(map) {
	let list = [];
	for (let n in map) { list.push(n); }
	return new RegExp(list.join('|'), 'ig');
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
const FONT_WEIGHTS_RE = _buildStyleRegExp(FONT_WEIGHTS);

const FONT_STYLES = {
	'italic': 'italic',
	'oblique': 'italic',
}
const FONT_STYLES_RE = _buildStyleRegExp(FONT_STYLES);

exports.Text = Text;
