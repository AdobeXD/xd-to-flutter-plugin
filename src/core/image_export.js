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
const app = require("application");

const $ = require("../utils/utils");
const NodeUtils = require("../utils/nodeutils");
const { Context, ContextTarget } = require("./context");
const { project } = require("./project");
const PropType = require("./proptype");
const { alert } = require("../ui/alert");
const { trace } = require('../utils/debug');

async function exportImage(selection, root) {
	let xdNode = $.getSelectedItem(selection), name = NodeUtils.getImageName(xdNode);
	if (!name) { alert("You must set an image name before exporting."); return; }

	if (!await project.checkRoot()) { return null; }
	let imageF = project.images;

	// Do a full scan so we have maxW/maxH values:
	let data = _scanForImages(root, {})[name];
	let ctx = new Context(ContextTarget.FILES);
	let fileName = await _exportImageData(data, name, imageF, ctx);
	ctx.resultMessage = fileName ? `Exported '${fileName}' successfully` : "Image export failed";
	return ctx;
}
exports.exportImage = exportImage;


async function exportAllImages(selection, root) {
	if (!await project.checkRoot()) { return null; }
	let imageF = project.images;

	let ctx = new Context(ContextTarget.FILES);
	let imageNames = _scanForImages(root, {}), count = 0, total = 0;
	for (let n in imageNames) {
		let data = imageNames[n];
		if (!data.includeInExportAll) { continue; }
		total++;
		let fileName = await _exportImageData(data, n, imageF, ctx);
		if (fileName) { count++; }
	}
	_pruneImageMap(imageNames);

	ctx.resultMessage = $.getExportAllMessage(count, total, "named image");
	return ctx;
}
exports.exportAllImages = exportAllImages;


function getImagePath(xdNode) {
	let name = _getImageFileName(xdNode);
	return name ? `${project.images.path}/${name}` : null;
}
exports.getImagePath = getImagePath;


function _pruneImageMap(activeNames) {
	// TODO: GS: might be worth pruning the image map stored on the root.
	// Leaving it intact means we would remember the image name even if they removed an image / exported / added it back.
}

function _scanForImages(xdNode, map) {
	// TODO: GS: should this exclude images in artboards that are not flagged for export?
	// TODO: GS: should we warn about every unnamed image?
	xdNode.children.forEach((child, i) => {
		if (!child.visible) { return; }
		if (child.fill instanceof xd.ImageFill) {
			let name = NodeUtils.getImageName(child);
			if (name) { map[name] = (map[name] || new _ImageData()).add(child); }
		} else if (child.children) { _scanForImages(child, map); }
	});
	return map;
}


async function _exportImageData(data, name, imageF, ctx) {
	let xdNode = data.xdNode, fill = xdNode.fill;
	let imgW = fill.naturalWidth, imgH = fill.naturalHeight;

	if (!NodeUtils.getProp(xd.root, PropType.RESOLUTION_AWARE)) {
		return await _exportImageFile(data.xdNode, name, imgW, imgH, imageF, ctx);
	}

	// Resolution aware export:
	let maxW = data.maxW, maxH = data.maxH;
	let aspect = imgW/imgH, maxScale = Math.min(imgW/maxW, imgH/maxH);
	let w = Math.max(maxW, maxH*aspect)+0.5 | 0, h = w / aspect + 0.5 | 0;

	let fileName = await _exportImageFile(xdNode, name, w, h, imageF, ctx);
	if (!fileName) { return null; }

	if (maxScale >= 3 && (imageF = project.imagesX3)) {
		await _exportImageFile(xdNode, name, w*3, h*3, imageF, ctx);
	}
	if (maxScale >= 2 && (imageF = project.imagesX2)) {
		await _exportImageFile(xdNode, name, w*2, h*2, imageF, ctx);
	}
	return fileName;
}

async function _exportImageFile(xdNode, name, w, h, imageF, ctx) {
	if (!imageF) { return; }

	// Gets the selected node's image fill, creates a new Rectangle node using the fill
	// at the natural size of the image, and then renders it to an image file.

	// There are two ways we could approach this.
	// One is to have this method return a rendition entry, and return it, then run them all at once.
	// The other is running them one at a time. This approach would let us show a progress bar,
	// and deal with errors individually, but may be slower?
	if (!(xdNode.fill instanceof xd.ImageFill)) {
		ctx.log.error('Tried to export an image from a node that does not have an image fill.', xNode);
		return;
	}

	let rect = new xd.Rectangle();
	rect.fill = xdNode.fill;
	rect.width = w;
	rect.height = h;

	let fileName = _getImageFileName(xdNode);
	let file = await imageF.getFile(fileName, ctx);
	if (!file) {
		ctx.log.error(`Could not create image file ('${fileName}').`, null);
		return null;
	}

	let type = _getRenditionType(xdNode);
	let opts = {
		node: rect,
		outputFile: file,
		type,
		scale: 1.0,
	};
	if (type === app.RenditionType.JPG) { opts.quality = 80; }

	await app.createRenditions([opts]).then(results => {
		trace(`Image output to: ${results[0].outputFile.nativePath}`);
	}).catch(error => {
		ctx.log.error(`Unable to export image ('${name}'): ${error}`, null);
		fileName = null;
	});
	return fileName;
}

function _getRenditionType(xdNode) {
	let fill = xdNode.fill;
	if (!fill || !(fill instanceof xd.ImageFill)) { return null; }
	return fill.mimeType === 'image/jpeg' ? app.RenditionType.JPG : app.RenditionType.PNG
}

function _getImageExtension(xdNode) {
	let type = _getRenditionType(xdNode);
	return !type ? null : type === app.RenditionType.JPG ? "jpg" : "png";
}

function _getImageFileName(xdNode) {
	let ext = _getImageExtension(xdNode), name = NodeUtils.getImageName(xdNode);
	return ext && name ? `${name}.${ext}` : null;
}

class _ImageData {
	constructor(xdNode) {
		this.xdNode = null;
		this.count = this.maxW = this.maxH = 0;
		this.includeInExportAll = true;
		this.add(xdNode);
	}

	add(xdNode) {
		if (!xdNode) { return this; }
		this.count++;
		this.xdNode = xdNode;
		let bounds = xdNode.globalBounds;
		this.maxW = Math.max(this.maxW, bounds.width);
		this.maxH = Math.max(this.maxH, bounds.height);
		//if (NodeUtils.getProp(xdNode, PropType.INCLUDE_IN_EXPORT_ALL_IMAGES)) { this.includeInExportAll = true; }
		return this;
	}
}