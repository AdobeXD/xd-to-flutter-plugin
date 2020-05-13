/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const app = require('application');
const fs = require('uxp').storage;
const $ = require('../core/utils');

let previewFile;

function initPreview() {
	(fs.localFileSystem.getTemporaryFolder()).then((folder) => {
		(folder.createFile('XD_Flutter_preview.png', { overwrite: true })).then((f) => {
			previewFile = f;
		})
	});
}
initPreview();

async function getPreview(node, retryCount=0) {
	// return null when something goes wrong, empty string for an empty preview
	if (!node) { return ''; }
	if (!previewFile) { return null; }
	let bounds = node.localBounds;
	let scale = Math.min(20, 200 / bounds.height, 400 / bounds.width) * 3; // for hi-dpi
	try {
		await app.createRenditions([{
			node, scale,
			outputFile: previewFile,
			type: app.RenditionType.PNG,
		}]);
	} catch(e) {
		if (retryCount > 0) {
			await $.delay(100);
			return await getPreview(node, retryCount-1);
		} else {
			return null;
		}
	}
	const data = await previewFile.read({ format: fs.formats.binary });
	return 'data:image/png;base64,' + base64ArrayBuffer(data);
}
exports.getPreview = getPreview;

function base64ArrayBuffer(arrayBuffer) {
    let base64 = '';
    const encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    const bytes = new Uint8Array(arrayBuffer);
    const byteLength = bytes.byteLength;
    const byteRemainder = byteLength % 3;
    const mainLength = byteLength - byteRemainder;

    let a, b, c, d;
    let chunk;

    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
        d = chunk & 63; // 63       = 2^6 - 1

        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
        chunk = bytes[mainLength];

        a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

        // Set the 4 least significant bits to zero
        b = (chunk & 3) << 4; // 3   = 2^2 - 1

        base64 += encodings[a] + encodings[b] + '==';
    } else if (byteRemainder == 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

        a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

        // Set the 2 least significant bits to zero
        c = (chunk & 15) << 2; // 15    = 2^4 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + '=';
    }

    return base64;
}