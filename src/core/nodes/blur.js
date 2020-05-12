const xd = require("scenegraph");
const utils = require("../utils");
const serialize = require("../serialize");

class BackgroundBlur {
	constructor(xdNode, child) {
		this.xdNode = xdNode;
		this.child = child;
	}

	toString(serializer, ctx) {
		let str = "BackdropFilter(" +
			serialize.getImageFilterPropertyString(this.xdNode.blur, serializer, ctx) +
			`child: ${this.child.toString(serializer, ctx)},` +
			")";
		let clipType = getClipType(this.child.xdNode);
		if (clipType) {
			str = `${clipType}(child: ${str},)`;
		}

		return str;
	}
}
exports.BackgroundBlur = BackgroundBlur;

class ObjectBlur {
	constructor(xdNode, child) {
		this.xdNode = xdNode;
		this.child = child;
	}

	toString(serializer, ctx) {
		let bounds = this.child.xdNode.localBounds;
		let blurAmount = this.xdNode.blur.blurAmount;
		let bx = utils.fix(bounds.x - blurAmount);
		let by = utils.fix(bounds.y - blurAmount);
		let bw = utils.fix(bounds.width + blurAmount * 2);
		let bh = utils.fix(bounds.height + blurAmount * 2);

		let clipType = getClipType(this.child.xdNode);
		let str = "Stack(overflow: Overflow.visible, children: <Widget>[" +
			this.child.toString(serializer, ctx) + "," +
			`Positioned(left: ${bx}, top: ${by}, width: ${bw}, height: ${bh}, child: ${clipType}(child:BackdropFilter(` +
			serialize.getImageFilterPropertyString(this.xdNode.blur, serializer, ctx) +
			`child: Container(color: const Color(0x00000000)), ),` +
			"),),])";

		return str;
	}
}
exports.ObjectBlur = ObjectBlur;

function getClipType(xdNode) {
	let clipType = null;
	if (xdNode instanceof xd.Rectangle) {
		clipType = "ClipRect";
	} else if (xdNode instanceof xd.Ellipse) {
		clipType = "ClipOval";
	}
	return clipType;
}
