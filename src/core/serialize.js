
const xd = require("scenegraph");
const assets = require("assets");
const $ = require("./utils");
const NodeUtils = require("./nodeutils");
const PropType = require("./proptype");
const nodetype = require("./nodetype");
const {getImagePath} = require("./image_export");
const { ContextTarget } = require("./context");

class Serializer {

	constructor(root) {
		this.root = null;
		this.parameterSerializeFnMap = {};

		this._buildParameterSerializeFnMap();
	}

	getNodeString(node, ctx) {
		let nodeStr = node.toString(this, ctx);
		let result = getNodeNameComment(node.xdNode) + '\n' + nodeStr;
		return nodeStr ? getPageLinkString(node.xdNode, this, ctx, result) : '';
	}

	serializeWidget(node, ctx) {
		this.root = node;
		return node.toString(this, ctx) + ";";
	}

	serializeNode(node, ctx) {
		this.root = node;
		return getTransformedNodeString(node, this, ctx) + ";";
	}

	serializeParameterValue(xdNode, value, ctx) {
		if (value == null) { return null; } // do not use strict equality here.
		let fn = this.parameterSerializeFnMap[value.constructor.name];
		if (fn) {
			return fn(xdNode, value, ctx);
		} else {
			ctx.log.error(`Serializer does not support serializing ${value.constructor.name}.`, xdNode);
			return null;
		}
	}

	jsTypeToDartType(type) {
		switch (type) {
			case "Boolean": return "bool";
			case "ImageFill": return "ImageProvider";
			case "Function": return "VoidCallback";
			default: return type;
		}
	}

	_buildParameterSerializeFnMap() {
		let fnMap = this.parameterSerializeFnMap;
		fnMap["Color"] = (xdNode, value) => getColorWithOpacityString(value, getOpacity(xdNode));
		fnMap["String"] = (xdNode, value) => `'${$.escapeString(value)}'`;
		fnMap["Boolean"] = (xdNode, value) => value ? "true" : "false";
		fnMap["ImageFill"] = (xdNode, value, ctx) => getAssetImageString(xdNode, this, ctx);
	}

}
exports.Serializer = Serializer;

function getTransformedNodeString(node, serializer, ctx) {
	if (!node)
		return "";
	let nodeString = serializer.getNodeString(node, ctx);
	if (!nodeString)
		return "";

	// For positioning the widget properly
	let transform = node.xdNode.transform;
	let lb = node.xdNode.localBounds;

	if (!(node.xdNode instanceof xd.Group))
		transform.translate(lb.x, lb.y);

	// If the node wants to modify it's own transform do that here
	if (node.adjustTransform)
		transform = node.adjustTransform(transform);

	let str;
	if (transform.a !== 1.0 || transform.b !== 0.0 || transform.c !== 0.0 || transform.d !== 1.0) {
		// Use full transform matrix
		// I'm gonna leave these fix values with 6 decimal places
		// here because these values aren't pixel translations but rather rotation
		// values that need a lot of precision
		let a = $.fix(transform.a, 6);
		let b = $.fix(transform.b, 6);
		let c = $.fix(transform.c, 6);
		let d = $.fix(transform.d, 6);
		let e = $.fix(transform.e, 2);
		let f = $.fix(transform.f, 2);
		str = "Transform(" +
			`transform: Matrix4(` +
			`${a}, ${b}, 0.0, 0.0,` +
			`${c}, ${d}, 0.0, 0.0,` +
			`0.0, 0.0, 1.0, 0.0,` +
			`${e}, ${f}, 0.0, 1.0),` +
			`child: ${nodeString},` +
			")";
	} else if (transform.e !== 0 || transform.f !== 0) {
		// Use offset transform
		let e = $.fix(transform.e, 2);
		let f = $.fix(transform.f, 2);
		str = "Transform.translate(" +
			`offset: Offset(${e}, ${f}),` +
			`child: ${nodeString},` +
			")";
	} else {
		// Don't transform
		str = nodeString;
	}

	return str;
}
exports.getTransformedNodeString = getTransformedNodeString;

function getColorString(color) {
	return "const Color(0x" + $.getARGBHexWithOpacity(color, 1.0) + ")";
}
exports.getColorString = getColorString;

function getColorWithOpacityString(color, opacity) {
	return "const Color(0x" + $.getARGBHexWithOpacity(color, opacity) + ")";
}
exports.getColorWithOpacityString = getColorWithOpacityString;

function getColorOrDecorationString(xdNode, serializer, ctx, parameters) {
	if (!xdNode.stroke && !xdNode.hasRoundedCorners && !xdNode.shadow && xdNode.fill instanceof xd.Color) {
		return getFillPropertyString(xdNode, serializer, ctx, parameters);
	} else {
		return getDecorationPropertyString(xdNode, serializer, ctx, parameters);
	}
}
exports.getColorOrDecorationString = getColorOrDecorationString;

function getDecorationPropertyString(o, serializer, ctx, parameters) {
	return `decoration: ${getBoxDecorationString(o, serializer, ctx, parameters)}, `;
}
exports.getDecorationPropertyString = getDecorationPropertyString;

function getBoxDecorationString(xdNode, serializer, ctx, parameters) {
	let str = $.getParamList([
		getBorderRadiusPropertyString(xdNode, serializer, ctx, parameters),
		getFillPropertyString(xdNode, serializer, ctx, parameters),
		getStrokePropertyString(xdNode, serializer, ctx, parameters),
		getShadowPropertyString(xdNode, serializer, ctx, parameters)
	]);
	return "BoxDecoration(" + str + ")";
}

function getNodeNameComment(xdNode) {
	return xdNode && !xdNode.hasDefaultName ? `\n // Adobe XD layer: '${$.shorten(xdNode.name, 20)}' (${nodetype.getXDLabel(xdNode)})` : '';
}
exports.getNodeNameComment = getNodeNameComment;

function getBorderRadiusPropertyString(o, serializer, ctx) {
	let radiusStr;
	if (o instanceof xd.Ellipse) {
		radiusStr = getEllipseBorderRadiusString(o, serializer, ctx);
	} else if (o.hasRoundedCorners) {
		radiusStr = getRectangleBorderRadiusString(o, serializer, ctx);
	}
	if (radiusStr) {
		return `borderRadius: ${radiusStr}`;
	}
	return "";
}

function getEllipseBorderRadiusString(o, serializer, ctx) {
	return `BorderRadius.all(Radius.elliptical(${$.fix(o.radiusX, 2)}, ${$.fix(o.radiusY, 2)}))`;
}

function getRectangleBorderRadiusString(o, serializer, ctx) {
	let radii = o.cornerRadii;
	let tl = radii.topLeft, tr = radii.topRight, br = radii.bottomRight, bl = radii.bottomLeft;
	if (tl === tr && tl === br && tl === bl) {
		return `BorderRadius.circular(${$.fix(tl, 2)})`;
	} else {
		return 'BorderRadius.only(' +
			getRadius("topLeft", tl) +
			getRadius("topRight", tr) +
			getRadius("bottomRight", br) +
			getRadius("bottomLeft", bl) +
			')';
	}
}

function getRadius(param, value) {
	if (value <= 1) { return ''; }
	return `${param}: Radius.circular(${$.fix(value, 2)}), `;
}

function getAssetImageString(xdNode, serializer, ctx) {
	let path = getImagePath(xdNode);
	if (!path) { ctx.log.warn('Image does not have a Flutter image name.', xdNode); }
	return `const AssetImage('${path || ''}')`;
}

function getFillPropertyString(xdNode, serializer, ctx, parameters) {
	if (!xdNode.fillEnabled || !xdNode.fill) { return ""; }
	let fill = xdNode.fill, blur = xdNode.blur;
	let fillOpacityFromBlur = (blur && blur.isBackgroundEffect) ? blur.fillOpacity : 1.0;
	let opacity = getOpacity(xdNode) * fillOpacityFromBlur;
	if (fill instanceof xd.Color) {
		let colorParameter = parameters["fill"].isOwn
			? getColorWithOpacityString(xdNode.fill, opacity)
			: parameters["fill"].name;
		return `color: ${colorParameter}`;
	}
	if (fill instanceof xd.ImageFill) {
		let imageParam = parameters["fill"].isOwn
			? getAssetImageString(xdNode, serializer, ctx)
			: parameters["fill"].name;
		return "image: DecorationImage("+
			`  image: ${imageParam},` +
			`  fit: ${getBoxFitString(fill.scaleBehavior)},` +
			getOpacityColorFilter(opacity) +
			")";
	}
	let gradient = getGradient(fill, opacity);
	if (gradient) { return `gradient: ${gradient}`; }
	ctx.log.warn(`Unrecognized fill type ('${fill.constructor.name}').`, xdNode);
}

function getGradient(fill, opacity) {
	// Note: XD API docs say this should be called `LinearGradientFill`
	return fill instanceof xd.LinearGradient ? getLinearGradient(fill, opacity) :
		   fill instanceof xd.RadialGradient ? getRadialGradient(fill, opacity) :
		   '';
}
exports.getGradient = getGradient;

function getGradientFromAsset(o) {
	return `const ${getGradientTypeFromAsset(o)}(` +
		getGradientStops(o.colorStops) +
	')';
}
exports.getGradientFromAsset = getGradientFromAsset;

function getGradientTypeFromAsset(o) {
	return o.gradientType === assets.RADIAL ? "RadialGradient" : "LinearGradient";
}
exports.getGradientTypeFromAsset = getGradientTypeFromAsset;

function getLinearGradient(fill, opacity=1) {
	return 'LinearGradient('+
		`begin: ${getAlignmentString(fill.startX, fill.startY)},` +
		`end: ${getAlignmentString(fill.endX, fill.endY)},` +
		getGradientStops(fill.colorStops, opacity) +
	')';
}

function getRadialGradient(fill, opacity=1) {
	// RadialGradient is currently undocumented. It has the following properties:
	// startX/Y/R, endX/Y/R, colorStops, gradientTransform
	// XD currently does not seem to utilize endX/Y or startR, but basic support is included here.

	// Flutter always draws relative to the shortest edge, whereas XD draws the gradient
	// stretched to the aspect ratio of its container.
	return 'RadialGradient('+
		`center: ${getAlignmentString(fill.startX, fill.startY)}, ` +
		(fill.startX === fill.endX && fill.startY === fill.endY ? '' :
			`focal: ${getAlignmentString(fill.endX, fill.endY)}, `) +
		(fill.startR === 0 ? '' : `focalRadius: ${$.fix(fill.startR, 3)}, `) +
		`radius: ${$.fix(fill.endR, 3)}, ` +
		getGradientStops(fill.colorStops, opacity) +
		getGradientXDTransform(fill) +
	')';
}

function getOpacityColorFilter(opacity) {
	if (opacity >= 1) { return ''; }
	return `colorFilter: new ColorFilter.mode(Colors.black.withOpacity(${$.fix(opacity, 2)}), BlendMode.dstIn),`;
}

function getGradientStops(arr, opacity) {
	let l = arr.length, stops = [], colors = [];
	for (let i=0; i<l; i++) {
		let s = arr[i];
		stops.push($.fix(s.stop, 3));
		colors.push(getColorWithOpacityString(s.color, opacity));
	}

	return `colors: [${colors.join(", ")}], stops: [${stops.join(", ")}], `;
}

function getGradientXDTransform(fill) {
	// The GradientXDTransform is needed even if there is no transformation in order to fix the aspect ratio.
	let o = fill.gradientTransform;
	return 'transform: GradientXDTransform(' +
		`${$.fix(o.a, 3)}, ${$.fix(o.b, 3)}, ${$.fix(o.c, 3)}, ` +
		`${$.fix(o.d, 3)}, ${$.fix(o.e, 3)}, ${$.fix(o.f, 3)}, ` +
		`${getAlignmentString(fill.startX, fill.startY)}), `;
}

function isIdentityTransform(o) {
	return (o.a === 1 && o.b === 0 && o.c === 0 && o.d === 1 && o.e === 0 && o.f === 0);
}

function getAlignmentString(x, y) {
	// XD uses 0 to 1, Flutter for some reason uses -1 to +1.
	return `Alignment(${$.fix(x*2-1, 2)}, ${$.fix(y*2-1, 2)})`;
}

function getBoxFitString(scaleBehavior, serializer, ctx) {
	return `BoxFit.${scaleBehavior === xd.ImageFill.SCALE_COVER ? 'cover' : 'fill'}`;
}

function getImageFilterPropertyString(blur, serializer, ctx) {
	return `filter: ${getImageFilterString(blur, serializer, ctx)}, `;
}
exports.getImageFilterPropertyString = getImageFilterPropertyString;

function getImageFilterString(blur, serializer, ctx) {
	let sigStr = $.fix(blur.blurAmount, 2);
	return `ui.ImageFilter.blur(sigmaX: ${sigStr}, sigmaY: ${sigStr})`;
}

function getParameterString(parameterName, ctx) {
	return `parameterName: `;
}
exports.getParameterString = getParameterString;

function getStrokePropertyString(xdNode, serializer, ctx, parameters) {
	if (xdNode.strokePosition !== xd.GraphicNode.INNER_STROKE) {
		ctx.log.warn('Only inner strokes are supported on rectangles & ellipses.', xdNode);
	}
	if (xdNode.strokeJoins !== xd.GraphicNode.STROKE_JOIN_MITER) {
		ctx.log.warn('Only miter stroke joins are supported on rectangles & ellipses.', xdNode);
	}
	let dashes = xdNode.strokeDashArray;
	if (dashes && dashes.length && dashes.reduce((a, b) => a + b)) {
		ctx.log.warn('Dashed lines are not supported on rectangles & ellipses.', xdNode);
	}
	let strokeEnableParamRef = parameters["strokeEnabled"];
	let strokeEnableParam = strokeEnableParamRef.parameter;
	let strokeParam = parameters["stroke"].isOwn
		? xdNode.stroke && getColorWithOpacityString(xdNode.stroke, getOpacity(xdNode))
		: parameters["stroke"].name;
	if (!strokeParam)
		return "";

	if (strokeEnableParamRef.isOwn) {
		if (!xdNode.strokeEnabled || !xdNode.stroke) { return ""; }
		return `border: Border.all(width: ${$.fix(xdNode.strokeWidth, 2)}, color: ${strokeParam})`;
	} else {
		return `border: ${strokeEnableParam.name} ? Border.all(width: ${$.fix(xdNode.strokeWidth, 2)}, color: ${strokeParam}) : null`;
	}
}

function getShadowPropertyString(o, serializer, ctx) {
	let s = o.shadow;
	if (!s || !s.visible) { return ""; }
	return `boxShadow: [BoxShadow(color: ${getColorWithOpacityString(s.color, getOpacity(o))}, offset: Offset(${s.x}, ${s.y}), blurRadius: ${s.blur})]`;
}

function getOpacity(xdNode) {
	let opacity = 1.0;
	// TODO: CE: Calculate opacity based off of parents compositing mode (whether or not it exports a blend mask widget that has it's own opacity and forces compositing)

	let o = xdNode;
	while (o) {
		if (typeof o.opacity === "number")
			opacity *= o.opacity;
		o = o.parent;
	}

	return opacity;
}
exports.getOpacity = getOpacity;

function getSizedGestureDetectorString(xdNode, serializer, ctx, paramName, isOwn) {
	if (isOwn)
		return "";

	let width = $.fix(xdNode.localBounds.width);
	let height = $.fix(xdNode.localBounds.height);
	let str = `Align(alignment: Alignment.topLeft, child: Container(width: ${width}, height: ${height}, child: GestureDetector(onTap: () => ${paramName}?.call()), ), )`;
	return str;

}
exports.getSizedGestureDetectorString = getSizedGestureDetectorString;

function getPageLinkString(xdNode, serializer, ctx, child) {
	if (NodeUtils.getProp(xd.root, PropType.ENABLE_PROTOTYPE) && xdNode.triggeredInteractions.length) {
		let interaction = xdNode.triggeredInteractions[0];
		if (xdNode.triggeredInteractions.length > 1) {
			ctx.log.warn(`Multiple interactions on one object is not unsupported.`, xdNode);
		}
		if (interaction.trigger.type !== "tap") {
			ctx.log.warn(`Trigger unsupported ('${interaction.trigger.type}'), only tap triggered are supported.`, xdNode);
		}
		let builder = "";
		let duration = "";
		let ease = "";
		let transition = "";
		if (interaction.action.type === "goToArtboard") {
			if (interaction.action.transition.type === "slide") {
				switch (interaction.action.transition.fromSide) {
					case "L":
						transition = "transition: LinkTransition.SlideLeft";
						break;
					case "R":
						transition = "transition: LinkTransition.SlideRight";
						break;
					case "T":
						transition = "transition: LinkTransition.SlideDown";
						break;
					case "B":
						transition = "transition: LinkTransition.SlideUp";
						break;
				}
			} else if (interaction.action.transition.type === "push") {
				switch (interaction.action.transition.fromSide) {
					case "L":
						transition = "transition: LinkTransition.PushLeft";
						break;
					case "R":
						transition = "transition: LinkTransition.PushRight";
						break;
					case "T":
						transition = "transition: LinkTransition.PushDown";
						break;
					case "B":
						transition = "transition: LinkTransition.PushUp";
						break;
				}
			} else if (interaction.action.transition.type === "dissolve") {
				transition = "transition: LinkTransition.Fade";
			} else {
				ctx.log.warn(`Transition type not supported: ${interaction.action.transition.type}.`, xdNode);
			}
			let artboard = ctx.getArtboardFromXdNode(interaction.action.destination);
			builder = `pageBuilder: () => ${artboard.toString(serializer, ctx)}`;
			duration = `duration: ${$.fix(interaction.action.transition.duration, 4)}`;
			switch (interaction.action.transition.easing) {
				case "linear":
					ease = "ease: Curves.linear";
					break;
				case "ease-in":
					ease = "ease: Curves.easeIn";
					break;
				case "ease-out":
					ease = "ease: Curves.easeOut";
					break;
				case "ease-in-out":
					ease = "ease: Curves.easeInOut";
					break;
				case "wind-up":
					ease = "ease: Curves.slowMiddle"; // TODO: CE: Find correct ease function
					break;
				case "bounce":
					ease = "ease: Curves.bounceIn";
					break;
				case "snap":
					ease = "ease: Curves.easeInOutExpo"; // TODO: CE: Find correct ease function
					break;
				default:
					ctx.log.warn(`Ease '${interaction.action.transition.easing}' unsupported.`, xdNode);
					ease = "";
					break;
			}
		} else if (interaction.action.type === "goBack") {
			builder = "";
		} else {
			ctx.log.warn(`Action type '${interaction.action.type}' unsupported.`, xdNode);
		}
		if (transition) transition += ",";
		if (duration) duration += ",";
		if (ease) ease += ",";
		if (builder) builder += ",";
		let str = `PageLink(links: [PageLinkInfo(${transition}${duration}${ease}${builder}), ], child: ${child}, )`;
		return str;
	} else {
		return child;
	}
}
exports.getPageLinkString = getPageLinkString;

function getChildListString(children, serializer, ctx) {
	let result = "";
	children.forEach(node => {
		let childStr = getTransformedNodeString(node, serializer, ctx);
		if (childStr) childStr += ",";
		result += childStr;
	});
	return result;
}
exports.getChildListString = getChildListString;

function getParameterListString(serializer, ctx, parameters) {
	let str = "";
	if (!parameters) { return str; }
	for (let n in parameters) {
		let ref = parameters[n], param = ref.parameter, value = param.value;
		let valStr = serializer.serializeParameterValue(param.owner.xdNode, value, ctx);
		str += `this.${ref.name}${valStr ? ` = ${valStr}` : ''}, `;
	}
	return str;
}

function getParameterMemberListString(serializer, parameters) {
	if (!parameters)
		return "";

	let str = Object.values(parameters).map(
		(ref) => `final ${serializer.jsTypeToDartType(ref.parameter.type)} ${ref.name}`).join(";");
	if (str)
		str += ";"
	return str;
}

function getWidgetString(node, serializer, ctx) {
	let className = node.widgetName;
	let parameters = null;
	if (node.parameters && node.childParameters) {
		parameters = {};
		for (let paramRef of Object.values(node.parameters).concat(Object.values(node.childParameters))) {
			if (paramRef.exportName)
				parameters[paramRef.name] = paramRef;
		}
	}
	let body = serializer.serializeWidget(node, ctx);
	let str = `class ${className} extends StatelessWidget {\n` +
		getParameterMemberListString(serializer, parameters) +
		`${className}({ Key key, ${getParameterListString(serializer, ctx, parameters)}}) : super(key: key);\n` +
		`@override Widget build(BuildContext context) { return ${body} }` +
		`}`;
	return str;
}

function getShapeDataNameString(node, serializer, ctx) {
	return $.cleanConstantName(`shapeSVG_${node.xdNode.guid}`);
}

exports.getShapeDataNameString = getShapeDataNameString;

function getShapeDataString(node, serializer, ctx) {
	let str = "";
	let shapeData = ctx.files[node.widgetName].shapeData;

	for (let [k, v] of Object.entries(shapeData)) {
		const name = getShapeDataNameString(v, serializer, ctx);
		const svgString = v.toSvgString(serializer, ctx);
		str += `const String ${name} = '${svgString}';`;
	}

	return str;
}

function getImportListString(node, serializer, ctx) {
	let str = "import 'package:flutter/material.dart';\n";
	let imports = Object.values(ctx.files[node.widgetName].imports);
	imports.forEach((imp) => {
		if (ctx.target === ContextTarget.FILES || !imp.isWidgetImport) {
			str += `import '${imp.name}'`;
			if (imp.scope) {
				str += ` as ${imp.scope}`;
			}
			str += ";\n";
		}
	});
	return str;
}

function getFileString(node, serializer, ctx) {
	let widgetStr = getWidgetString(node, serializer, ctx);
	let shapeDataStr = getShapeDataString(node, serializer, ctx);
	return getImportListString(node, serializer, ctx) + widgetStr + shapeDataStr;
}
exports.getFileString = getFileString;

