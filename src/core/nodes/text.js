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
const { getColor, getString, DartType } = require("../../utils/exportutils");

const { ExportNode } = require("./exportnode");
const PropType = require("../proptype");

/*
Notes:
- Line height in XD is a fixed pixel value. In Flutter it is a multiplier of the largest text in a line. This causes differences in rich text with different sizes.
- SingleChildScrollView does not work correctly when in a Transform.
*/

class Text extends ExportNode {
	static create(xdNode, ctx) {
		if (xdNode instanceof xd.Text) {
			return new Text(xdNode, ctx);
		}
	}

	constructor(xdNode, ctx) {
		super(xdNode, ctx);

		ctx.addParam(this.addParam("text", NodeUtils.getProp(xdNode, PropType.TEXT_PARAM_NAME), DartType.STRING, getString(xdNode.text)));
		ctx.addParam(this.addParam("fill", NodeUtils.getProp(xdNode, PropType.COLOR_PARAM_NAME), DartType.COLOR, getColor(xdNode.fill)));
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

	_serialize(ctx) {
		let str, o = this.xdNode;

		this._checkForUnsupportedFeatures(o, ctx);
		ctx.addFont(this._getFontFamily(o), o);

		if (o.styleRanges.length <= 1 || this.getParam("text") || this.getParam("fill")) {
			str = this._getText(o);
		} else {
			str = this._getTextRich(o);
		}

		if (o.areaBox) {
			// Area text.
			// don't add padding since the user set an explicit width
			let w = $.fix(o.areaBox.width, 0), h = $.fix(o.areaBox.height, 0);
			// TODO: GS: scrolling does not work correctly for translated widgets.
			if (o.clippedByArea) { str = `SingleChildScrollView(child: ${str})`; }
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

	_getText() {
		let text = this.getParamName("text") || getString(this.xdNode.text);
		return "Text(" +
			`${text}, ` +
			this._getStyleParam(this._getTextStyleParamList(null)) +
			this._getTextAlignParam() +
		")";
	}
	
	_getTextRich() {
		let xdNode = this.xdNode, text = xdNode.text;
		let styles = xdNode.styleRanges;
		let str = "", j=0;
		let defaultStyleParams = this._getTextStyleParamList(styles[0], true);
	
		for (let i=0; i<styles.length; i++) {
			let style = styles[i], l = style.length;
			if (style.length === 0) { continue; }
			let styleParams = this._getTextStyleParamList(styles[i]);
			let delta = $.getParamDelta(defaultStyleParams, styleParams);
			if (i === styles.length - 1) { l = text.length - j; } // for some reason, XD doesn't always return the correct length for the last entry.
			str += this._getTextSpan(delta, text.substr(j, l)) + ", ";
			j += l;
		}
	
		// Export a rich text object with an empty root span setting a default style.
		// Child spans set their style as a delta of the default.
		return "Text.rich(TextSpan(" +
			this._getStyleParam(defaultStyleParams) +
			`  children: [${str}],` +
		`), ${this._getTextAlignParam()})`;
	
	}

	_checkForUnsupportedFeatures(o, ctx) {
		// TODO: GS: Run this against text ranges?
		if (o.textScript !== "none") {
			// super / subscript
			ctx.log.warn("Superscript & subscript are not currently supported.", this.xdNode);
		}
		if (o.textTransform !== "none") {
			// uppercase / lowercase / titlecase
			ctx.log.warn("Text transformations (all caps, title case, lowercase) are not currently supported.", this.xdNode);
		}
		if (o.paragraphSpacing) {
			ctx.log.warn("Paragraph spacing is not currently supported.", this.xdNode);
		}
		if (o.strokeEnabled && o.stroke) {
			// outline text
			ctx.log.warn("Text border is not currently supported.", this.xdNode);
		}
	}

	_getTextSpan(styleParams, text) {
		return "TextSpan(" +
			` text: ${getString(text)}, ` +
			this._getStyleParam(styleParams) +
		")";
	}

	_getTextAlignParam() {
		return `textAlign: ${this._getTextAlign(this.xdNode.textAlign)}, `;
	}

	_getTextAlign(align) {
		return "TextAlign." + (align === "right" ? "right" : align === "center" ? "center" : "left");
	}

	_getTextStyleParamList(styleRange, isDefault=false) {
		// Builds an array of style parameters.
		let o = styleRange || this.xdNode;
		return [
			this._getFontFamilyParam(o),
			this._getFontSizeParam(o),
			this._getColorParam(o),
			this._getLetterSpacingParam(o),
			// The default style doesn't include weight, decoration, or style (italic):
			(isDefault ? null : this._getFontStyleParam(o)),
			(isDefault ? null : this._getFontWeightParam(o)),
			(isDefault ? null : this._getTextDecorationParam(o)),
			// Line height & shadows are set at the node level in XD, so not included for ranges:
			(!styleRange || isDefault  ? this._getHeightParam(this.xdNode) : null),
			(!styleRange || isDefault ? this._getShadowsParam(this.xdNode) : null),
		];
	}

	_getStyleParam(styleParams) {
		if (!styleParams) { return ""; }
		let str = $.getParamList(styleParams);
		return (!str ? "" : `style: TextStyle(${str}), `);
	}

	_getFontFamilyParam(o) {
		return `fontFamily: '${this._getFontFamily(o)}', `;
	}

	_getFontFamily(o) {
		return NodeUtils.getFlutterFont(o.fontFamily) || o.fontFamily;
	}

	_getFontSizeParam(o) {
		return `fontSize: ${o.fontSize}, `;
	}

	_getColorParam(o) {
		return `color: ${this.getParamName("fill") || getColor(o.fill, NodeUtils.getOpacity(o))}, `;
	}

	_getLetterSpacingParam(o) {
		// Flutter uses pixel values for letterSpacing.
		// XD uses increments of 1/1000 of the font size.
		return (o.charSpacing === 0 ? "" : `letterSpacing: ${o.charSpacing / 1000 * o.fontSize}, `);
	}

	_getFontStyleParam(o) {
		let style = this._getFontStyle(o.fontStyle);
		return style ? `fontStyle: ${style}, ` : "";
	}

	_getFontStyle(style) {
		style = style.toLowerCase();
		let match = style.match(FONT_STYLES_RE);
		let val = match && FONT_STYLES[match];
		return val ? "FontStyle." + val : null;
	}

	_getFontWeightParam(o) {
		let weight = this._getFontWeight(o.fontStyle);
		return weight ? `fontWeight: ${weight}, ` : "";
	}

	_getFontWeight(style) {
		style = style.toLowerCase();
		let match = style.match(FONT_WEIGHTS_RE);
		let val = match && FONT_WEIGHTS[match];
		return val ? "FontWeight." + val : null;
	}

	_getTextDecorationParam(o) {
		let u = o.underline, s = o.strikethrough, str = "";
		if (!u && !s) { return str; }
		if (u && s) {
			str = "TextDecoration.combine([TextDecoration.underline, TextDecoration.lineThrough])";
		} else {
			str = `TextDecoration.${u ? "underline" : "lineThrough"}`;
		}
		return `decoration: ${str}, `;
	}

	_getHeightParam(o) {
		// XD reports a lineSpacing of 0 to indicate default spacing.
		// Flutter uses a multiplier against the font size for its "height" value.
		// XD uses a pixel value.
		return (o.lineSpacing === 0 ? "" : `height: ${o.lineSpacing / o.fontSize}, `);
	}

	_getShadowsParam() {
		let xdNode = this.xdNode;
		return (xdNode.shadow === null || !xdNode.shadow.visible ? "" :
			`shadows: [${this._getShadow(xdNode.shadow)}], `);
	}

	_getShadow(shadow) {
		let o = shadow;
		return `Shadow(color: ${getColor(o.color)}, ` +
			(o.x || o.y ? `offset: Offset(${o.x}, ${o.y}), ` : "") +
			(o.blur ? `blurRadius: ${o.blur}, ` : "") +
		")";
	}
}
exports.Text = Text;

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
