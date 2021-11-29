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

const $ = require("../../utils/utils");
const NodeUtils = require("../../utils/nodeutils");
const { getColor, getString, getScrollView, DartType } = require("../../utils/exportutils");

const { AbstractNode } = require("./abstractnode");
const PropType = require("../proptype");
const { Layout } = require("../decorators/layout");

/*
Notes:
- Line height in XD is a fixed pixel value. In Flutter it is a multiplier of the largest text in a line. This causes differences in rich text with different sizes.
*/

class Text extends AbstractNode {
	static create(xdNode, ctx) {
		if (xdNode instanceof xd.Text) {
			return new Text(xdNode, ctx);
		}
	}

	constructor(xdNode, ctx) {
		super(xdNode, ctx);
		 // TODO: this actually could probably be false, with adjustedBounds updated to check areabox, etc.
		 // it gets complicated though because of aligned text with a width but no height
		 // would have to update addSizedBox to support null values
		this.setsOwnSize = true;
		ctx.addParam(this.addParam("text", NodeUtils.getProp(xdNode, PropType.TEXT_PARAM_NAME), DartType.STRING, getString(xdNode.text)));
		ctx.addParam(this.addParam("fill", NodeUtils.getProp(xdNode, PropType.COLOR_PARAM_NAME), DartType.COLOR, getColor(xdNode.fill)));
	}

	get adjustedBounds() {
		let bounds = super.adjustedBounds, o = this.xdNode;
		if (!o.areaBox && !this.layout.responsive) {
			let pad = Math.max(o.fontSize * (1 + o.charSpacing*10) * 0.25, bounds.width * 0.05);
			bounds.width += 2 * pad;
			if (o.textAlign === xd.Text.ALIGN_RIGHT) { bounds.x -= pad*2; }
			else if (o.textAlign === xd.Text.ALIGN_CENTER) { bounds.x -= pad; }
		}
		return bounds;
	}

	get transform() {
		let o = this.xdNode;
		return {rotation: o.rotation, flipY: o.flipY};
	}

	_serialize(ctx) {
		let str, o = this.xdNode;

		if (o.styleRanges.length <= 1 || this.getParam("text") || this.getParam("fill")) {
			str = this._getText(ctx);
		} else {
			str = this._getTextRich(ctx);
		}

		if (o.clippedByArea) { str = getScrollView(str, this, ctx); }
		if (this.layout.responsive) {
			// doesn't need any modifications unless shouldFixSize is true.
			if (this.layout.shouldFixSize) {
				str = Layout.addSizedBox(str, super.adjustedBounds, ctx);
			}
		} else if (o.areaBox) {
			// Area text.
			// don't add padding since the user set an explicit width
			str = Layout.addSizedBox(str, o.areaBox, ctx);
		} else if (o.textAlign !== xd.Text.ALIGN_LEFT) {
			// To keep it aligned we need a width, with a touch of padding to minimize differences in rendering.
			let w = $.fix(this.adjustedBounds.width, 0);
			// only apply a horizontal bound to allow wrapping:
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

	_getText(ctx) {
		let o = this.xdNode, text = this.getParamName("text") || getString(o.text);
		return "Text(" +
			`${text}, ` +
			getStyleParam(this._getTextStyleParamList(o, false, ctx)) +
			(o.lineSpacing !== 0 ? this._getTextHeightBehavior() : "") +
			this._getTextAlignParam() +
		")";
	}
	
	_getTextRich(ctx) {
		let xdNode = this.xdNode, text = xdNode.text;
		let styles = xdNode.styleRanges;
		let str = "", j=0;
		let defaultStyleParams = this._getTextStyleParamList(styles[0], true, ctx);
		let hasTextHeight = false;
	
		for (let i=0; i<styles.length; i++) {
			let style = styles[i], l = style.length;
			hasTextHeight = hasTextHeight || style.lineSpacing !== 0;
			if (l === 0) { continue; }
			let styleParams = this._getTextStyleParamList(style, false, ctx);
			let delta = $.getParamDelta(defaultStyleParams, styleParams);
			if (i === styles.length - 1) { l = text.length - j; } // for some reason, XD doesn't always return the correct length for the last entry.
			str += this._getTextSpan(delta, text.substr(j, l)) + ", ";
			j += l;
		}
	
		// Export a rich text object with an empty root span setting a default style.
		// Child spans set their style as a delta of the default.
		return "Text.rich(TextSpan(" +
			getStyleParam(defaultStyleParams) +
			`  children: [${str}], ),` +
			(hasTextHeight ? this._getTextHeightBehavior() : "") +
			this._getTextAlignParam() +
		")";
	}

	_getTextSpan(styleParams, text) {
		return "TextSpan(" +
			` text: ${getString(text)}, ` +
			getStyleParam(styleParams) +
		")";
	}

	_getTextAlignParam() {
		return `textAlign: ${this._getTextAlign(this.xdNode.textAlign)}, `;
	}

	_getTextAlign(align) {
		return "TextAlign." + (align === "right" ? "right" : align === "center" ? "center" : "left");
	}

	_getTextHeightBehavior() {
		// TODO: this could potentially use some fuzzy logic to only apply to fields that are multi-line,
		// and just omit the line height for single line text.
		// ex. if (nodeHeight < textHeight * 1.2)
		// it's a bit esoteric though, and could cause confusion
		return "textHeightBehavior: TextHeightBehavior(applyHeightToFirstAscent: false), ";
	}

	_getTextStyleParamList(o, isDefault, ctx) {
		return getTextStyleParamList(o, isDefault, ctx, this.xdNode, this.getParamName("fill"));
	}
}
exports.Text = Text;


function getTextStyleParamList(o, isDefault, ctx, xdNode=null, fill=null) {
	let isStyleRange = o.length != null;

	// kind of an unusual place for this, but we want to run it on every style object:
	_checkForUnsupportedFeatures(o, xdNode, ctx);
	ctx.addFont(_getFontFamily(o), xdNode);

	// Builds an array of style parameters.
	return [
		_getFontFamilyParam(o),
		_getFontSizeParam(o),
		_getColorParam(o, fill),
		_getLetterSpacingParam(o),
		// The default style doesn't include weight, decoration, or style (italic):
		(isDefault ? null : _getFontStyleParam(o)),
		(isDefault ? null : _getFontWeightParam(o)),
		(isDefault ? null : _getTextDecorationParam(o)),
		// Line height & shadows are set at the node level in XD, so not included for ranges:
		(!isStyleRange || isDefault  ? _getHeightParam(xdNode || o) : null),
		(!isStyleRange || isDefault ? _getShadowsParam(xdNode || o) : null),
	];
}
exports.getTextStyleParamList = getTextStyleParamList;

function getStyleParam(styleParams) {
	if (!styleParams) { return ""; }
	let str = getTextStyle(styleParams);
	return !str ? "" : `style: ${str}, `;
}
exports.getStyleParam = getStyleParam;

function getTextStyle(styleParams) {
	let str = $.getParamList(styleParams);
	return  !str ? "" : `TextStyle(${str})`;
}
exports.getTextStyle = getTextStyle;

function _checkForUnsupportedFeatures(o, xdNode, ctx) {
	if (o.textScript !== "none") {
		// super / subscript
		ctx.log.warn("Superscript & subscript are not currently supported.", xdNode);
	}
	if (o.textTransform !== "none") {
		// uppercase / lowercase / titlecase
		ctx.log.warn("Text transformations (all caps, title case, lowercase) are not currently supported.", xdNode);
	}
	if (o.paragraphSpacing) {
		ctx.log.warn("Paragraph spacing is not currently supported.", xdNode);
	}
	if (o.strokeEnabled && o.stroke) {
		// outline text
		ctx.log.warn("Text border is not currently supported.", xdNode);
	}
}

function _getFontFamilyParam(o) {
	return `fontFamily: '${_getFontFamily(o)}', `;
}

function _getFontFamily(o) {
	return NodeUtils.getFlutterFont(o.fontFamily) || o.fontFamily;
}

function _getFontSizeParam(o) {
	return `fontSize: ${o.fontSize}, `;
}

function _getColorParam(o, fill) {
	return `color: ${fill || getColor(o.fill, NodeUtils.getOpacity(o))}, `;
}

function _getLetterSpacingParam(o) {
	// Flutter uses pixel values for letterSpacing.
	// XD uses increments of 1/1000 of the font size.
	return (o.charSpacing === 0 ? "" : `letterSpacing: ${o.charSpacing / 1000 * o.fontSize}, `);
}

function _getFontStyleParam(o) {
	let style = _getFontStyle(o.fontStyle);
	return style ? `fontStyle: ${style}, ` : "";
}

function _getFontStyle(style) {
	style = style.toLowerCase();
	let match = style.match(FONT_STYLES_RE);
	let val = match && FONT_STYLES[match];
	return val ? "FontStyle." + val : null;
}

function _getFontWeightParam(o) {
	let weight = _getFontWeight(o.fontStyle);
	return weight ? `fontWeight: ${weight}, ` : "";
}

function _getFontWeight(style) {
	style = style.toLowerCase();
	let match = style.match(FONT_WEIGHTS_RE);
	let val = match && FONT_WEIGHTS[match];
	return val ? "FontWeight." + val : null;
}

function _getTextDecorationParam(o) {
	let u = o.underline, s = o.strikethrough, str = "";
	if (!u && !s) { return str; }
	if (u && s) {
		str = "TextDecoration.combine([TextDecoration.underline, TextDecoration.lineThrough])";
	} else {
		str = `TextDecoration.${u ? "underline" : "lineThrough"}`;
	}
	return `decoration: ${str}, `;
}

function _getHeightParam(o) {
	// XD reports a lineSpacing of 0 to indicate default spacing.
	// Flutter uses a multiplier against the font size for its "height" value.
	// XD uses a pixel value.
	return (o.lineSpacing === 0 ? "" : `height: ${o.lineSpacing / o.fontSize}, `);
}

function _getShadowsParam(xdNode) {
	return (xdNode.shadow == null || !xdNode.shadow.visible ? "" :
		`shadows: [${_getShadow(xdNode.shadow)}], `);
}

function _getShadow(shadow) {
	let o = shadow;
	return `Shadow(color: ${getColor(o.color)}, ` +
		(o.x || o.y ? `offset: Offset(${o.x}, ${o.y}), ` : "") +
		(o.blur ? `blurRadius: ${o.blur}, ` : "") +
	")";
}


function _buildStyleRegExp(map) {
	let list = [];
	for (let n in map) { list.push(n); }
	return new RegExp(list.join("|"), "ig");
}

// Used to translate font weight names from XD to Flutter constants:
// https://www.webtype.com/info/articles/fonts-weights/
const FONT_WEIGHTS = {
	"thin": "w100",
	"hairline": "w100",
	"extralight": "w200",
	"ultralight": "w200",
	"light": "w300",
	"book": "w300",
	"demi": "w300",

	"normal": null, // w400
	"regular": null,
	"plain": null,

	"medium": "w500",
	"semibold": "w600",
	"demibold": "w600",
	"bold": "w700", // or "bold"
	"extrabold": "w800",
	"heavy": "w800",
	"black": "w900",
	"poster": "w900",
}
const FONT_WEIGHTS_RE = _buildStyleRegExp(FONT_WEIGHTS);

const FONT_STYLES = {
	"italic": "italic",
	"oblique": "italic",
}
const FONT_STYLES_RE = _buildStyleRegExp(FONT_STYLES);
