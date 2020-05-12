const xd = require("scenegraph");

const utils = require("../utils");
const serialize = require("../serialize");
const {ContextTarget} = require("../context");
const {getImagePath} = require("../image_export");

class Path {
	constructor(xdNode) {
		this.xdNode = xdNode;
		this.shapes = [];
		this.viewBox = null;
	}

	calculateViewBox() {
		if (this.viewBox)
			return;

		this.viewBox = calculateAggregateViewBox(this.shapes);
	}

	get boundsInParent() {
		this.calculateViewBox();
		return this.xdNode.transform.transformRect(this.viewBox);
	}

	adjustTransform(matrix) {
		this.calculateViewBox();
		return new xd.Matrix(1.0, 0.0, 0.0, 1.0, this.viewBox.x, this.viewBox.y);
	}

	toString(serializer, ctx) {
		let svg;
		if (ctx.target === ContextTarget.CLIPBOARD) {
			svg = `'${this.toSvgString(serializer, ctx)}'`;
		} else {
			svg = serialize.getShapeDataNameString(this, serializer, ctx);
		}
		return `SvgPicture.string(${svg}, allowDrawingOutsideViewBox: true, )`;
	}

	toSvgString(serializer, ctx) {
		this.calculateViewBox();

		let vx = utils.fix(this.viewBox.x);
		let vy = utils.fix(this.viewBox.y);
		// For some reason xd can have a viewport with 0 extent so clamp it to 1
		let vw = utils.fix(Math.max(this.viewBox.width, 1));
		let vh = utils.fix(Math.max(this.viewBox.height, 1));

		let svg = "";
		for (let i = 0; i < this.shapes.length; ++i) {
			let o = this.shapes[i];
			if (o instanceof Path) {
				svg += serializeSvgGroup(o, serializer, ctx);
			} else {
				svg += serializeSvgShape(o, serializer, ctx);
			}
		}
		svg = `<svg viewBox="${vx} ${vy} ${vw} ${vh}" >${svg}</svg>`;

		return svg;
	}
}

exports.Path = Path;

function serializeSvgGroup(node, serializer, ctx) {
	let result = "";
	let xform = getSvgTransform(node.xdNode.transform);
	result += `<g transform="${xform}">`;
	for (let i = 0; i < node.shapes.length; ++i) {
		let o = node.shapes[i];
		if (o instanceof Path) {
			result += serializeSvgGroup(o, serializer, ctx);
		} else {
			result += serializeSvgShape(o, serializer, ctx);
		}
	}
	result += "</g>";
	return result;
}

function serializeSvgShape(o, serializer, ctx) {
	// TODO: CE: Pull some of this code out into utility functions
	let pathStr = o.pathData;
	let opacity = serialize.getOpacity(o);
	let fill = "none";
	let fillOpacity = opacity;
	let hasImageFill = false;
	let hasGradientFill = false;
	if (o.fill && o.fillEnabled) {
		hasImageFill = (o.fill instanceof xd.ImageFill);
		hasGradientFill = (o.fill instanceof xd.LinearGradient) || (o.fill instanceof xd.RadialGradient);
		if (hasImageFill) {
			fill = "url(#image)";
		} else if (hasGradientFill) {
			fill = "url(#gradient)";
		} else {
			fill = "#" + utils.getRGBHex(o.fill);
			fillOpacity = (o.fill.a / 255.0) * opacity;
		}
	}
	if (hasImageFill) {
		ctx.log.warn('Image fills are not supported on shapes.', o);
	}
	let imagePath = hasImageFill ? getImagePath(o) : "";
	let imageWidth = utils.fix(hasImageFill ? o.fill.naturalWidth : 0);
	let imageHeight = utils.fix(hasImageFill ? o.fill.naturalHeight : 0);
	let stroke = (o.stroke && o.strokeEnabled)
		? "#" + utils.getRGBHex(o.stroke) : "none";
	let strokeOpacity = (o.stroke && o.strokeEnabled)
		? (o.stroke.a / 255.0) * opacity : opacity;
	let strokeWidth = o.strokeWidth;
	let strokeDash = o.strokeDashArray.length > 0 ? o.strokeDashArray[0] : 0;
	let strokeGap = o.strokeDashArray.length > 1 ? o.strokeDashArray[1] : strokeDash;
	let strokeOffset = o.strokeDashArray.length > 0 ? o.strokeDashOffset : 0;
	let strokeMiterLimit = o.strokeJoins == xd.GraphicNode.STROKE_JOIN_MITER
		? o.strokeMiterLimit : 0;
	let strokeCap = o.strokeEndCaps;
	let strokeJoin = o.strokeJoins;
	
	let fillAttrib = `fill="${fill}"`;
	if (fillOpacity != 1.0)
		fillAttrib += ` fill-opacity="${utils.fix(fillOpacity, 2)}"`;
	let	strokeAttrib = `stroke="${stroke}" stroke-width="${strokeWidth}"`;

	if (strokeOpacity != 1.0)
		strokeAttrib += ` stroke-opacity="${utils.fix(strokeOpacity, 2)}"`;
	if (strokeGap != 0)
		strokeAttrib += ` stroke-dasharray="${strokeDash} ${strokeGap}"`;
	if (strokeOffset != 0)
		strokeAttrib += ` stroke-dashoffset="${strokeOffset}"`;
	if (strokeMiterLimit != 0)
		strokeAttrib += ` stroke-miterlimit="${strokeMiterLimit}"`;
	if (strokeCap != xd.GraphicNode.STROKE_CAP_BUTT)
		strokeAttrib += ` stroke-linecap="${strokeCap}"`;
	if (strokeJoin != xd.GraphicNode.STROKE_JOIN_MITER)
		strokeAttrib += ` stroke-linejoin="${strokeJoin}"`;

	let hasShadow = o.shadow && o.shadow.visible;
	if (hasShadow) { ctx.log.warn('Shadows are not supported on shapes.', o); }
	let filterAttrib = hasShadow ? `filter="url(#shadow)"` : ``;
	let shadowOffsetX = hasShadow ? o.shadow.x : 0;
	let shadowOffsetY = hasShadow ? o.shadow.y : 0;
	let shadowBlur = hasShadow ? o.shadow.blur : 0;

	let defs = "";
	if (hasShadow) {
		defs += `<filter id="shadow"><feDropShadow dx="${shadowOffsetX}" dy="${shadowOffsetY}" stdDeviation="${shadowBlur}"/></filter>`;
	}
	if (hasImageFill) {
		defs += `<pattern id="image" patternUnits="userSpaceOnUse" width="${imageWidth}" height="${imageHeight}"><image xlink:href="${imagePath}" x="0" y="0" width="${imageWidth}" height="${imageHeight}" /></pattern>`;
	}
	if (hasGradientFill) {
		if (o.fill instanceof xd.LinearGradient) {
			const x1 = utils.fix(o.fill.startX, 6);
			const y1 = utils.fix(o.fill.startY, 6);
			const x2 = utils.fix(o.fill.endX, 6);
			const y2 = utils.fix(o.fill.endY, 6);
			defs += `<linearGradient id="gradient" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">`;
			for (let stop of o.fill.colorStops) {
				const offset = utils.fix(stop.stop, 6);
				const color = utils.getARGBHexWithOpacity(stop.color);
				const opacity = stop.color.a !== 255 ? `stop-opacity="${utils.fix(stop.color.a / 255.0, 2)}"` : "";
				defs += `<stop offset="${offset}" stop-color="#${color}" ${opacity} />`;
			}
			defs += `</linearGradient>`;
		} else if (o.fill instanceof xd.RadialGradient) {
			const inv = o.fill.gradientTransform.invert();
			const start = inv.transformPoint({ x: o.fill.startX, y: o.fill.startY });
			const end = inv.transformPoint({ x: o.fill.endX, y: o.fill.endY });
			const fx = utils.fix(start.x, 6);
			const fy = utils.fix(start.y, 6);
			const fr = utils.fix(o.fill.startR, 6);
			const cx = utils.fix(end.x, 6);
			const cy = utils.fix(end.y, 6);
			const r = utils.fix(o.fill.endR, 6);
			const a = utils.fix(o.fill.gradientTransform.a, 6);
			const b = utils.fix(o.fill.gradientTransform.b, 6);
			const c = utils.fix(o.fill.gradientTransform.c, 6);
			const d = utils.fix(o.fill.gradientTransform.d, 6);
			const e = utils.fix(o.fill.gradientTransform.e, 6);
			const f = utils.fix(o.fill.gradientTransform.f, 6);
			let xform="";
			if (a !== 1.0 || b !== 0.0 || c !== 0.0 || d !== 1.0 || e !== 0.0 || f !== 0.0) {
				xform = `gradientTransform="matrix(${a} ${b} ${c} ${d} ${e} ${f})"`;
			}
			defs += `<radialGradient id="gradient" ${xform} fx="${fx}" fy="${fy}" fr="${fr}" cx="${cx}" cy="${cy}" r="${r}">`;
			for (let stop of o.fill.colorStops) {
				const offset = utils.fix(stop.stop, 6);
				const color = utils.getRGBHex(stop.color);
				const opacity = stop.color.a !== 255 ? `stop-opacity="${utils.fix(stop.color.a / 255.0, 2)}"` : "";
				defs += `<stop offset="${offset}" stop-color="#${color}" ${opacity}/>`;
			}
			defs += `</radialGradient>`;
		}
	}
	defs = defs ? `<defs>${defs}</defs>` : "";

	o.transform.translate(o.localBounds.x, o.localBounds.y);
	const xform = getSvgTransform(o.transform);
	let transformAttrib = xform ? `transform="${xform}"` : "";

	let str = `${defs}<path ${transformAttrib} d="${pathStr}" ${fillAttrib} ${strokeAttrib} ${filterAttrib}/>`;
	return str;
}

function getSvgTransform(transform) {
	let result;

	if (transform.a !== 1.0 || transform.b !== 0.0 || transform.c !== 0.0 || transform.d !== 1.0) {
		// Use full transform
		const a = utils.fix(transform.a, 6);
		const b = utils.fix(transform.b, 6);
		const c = utils.fix(transform.c, 6);
		const d = utils.fix(transform.d, 6);
		const e = utils.fix(transform.e, 2);
		const f = utils.fix(transform.f, 2);
		result = `matrix(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`;
	} else if (transform.e !== 0.0 || transform.f !== 0.0) {
		// Use offset transform
		const e = utils.fix(transform.e, 2);
		const f = utils.fix(transform.f, 2);
		result = `translate(${e}, ${f})`;
	} else {
		result = "";
	}
	return result;
}

function calculateAggregateViewBox(shapes) {
	let minX = Number.MAX_VALUE;
	let minY = Number.MAX_VALUE;
	let maxX = -Number.MAX_VALUE;
	let maxY = -Number.MAX_VALUE;

	for (let o of shapes) {
		if (o.boundsInParent.x < minX)
			minX = o.boundsInParent.x;
		if (o.boundsInParent.y < minY)
			minY = o.boundsInParent.y;
		if (o.boundsInParent.x + o.boundsInParent.width > maxX)
			maxX = o.boundsInParent.x + o.boundsInParent.width;
		if (o.boundsInParent.y + o.boundsInParent.height > maxY)
			maxY = o.boundsInParent.y + o.boundsInParent.height;
	}

	return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

