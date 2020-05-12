const xd = require("scenegraph");
const { formatDart } = require("../lib/dart_style");
const { trace } = require('./trace');


/* for performance testing the formatDart method: */
async function testDartStyle(selection) {
	let el = selection.items[0];
	if (!(el instanceof xd.Text)) { trace("select text"); return; }
	let str = el.text, count=0, maxT=1000, result;
	let t = Date.now();
	while (Date.now() - t < maxT) {
		result = formatDart(str);
		count++;
	}
	t = Date.now() - t;
	trace(result);
	trace("-------------------");
	trace(str.length + " characters formatted");
	trace(count + " iterations took " + t + "ms (avg: " + (t/count).toFixed(1) + "ms)");
}

// For debugging
async function dumpNodePluginData(selection, root) {
	let _dumpPluginData = (pluginData, depth) => {
		if (!pluginData)
			return;
		let t = "";
		for (let i = 0; i < depth; ++i)
			t += "  ";
		for (let [k, v] of Object.entries(pluginData)) {
			trace(`${t}${k} => ${v}`);
		}
	};
	let _dumpNodePluginData = (xdNode, depth) => {
		if (!xdNode)
			return;
		let d = depth || 0;
		_dumpPluginData(xdNode.pluginData, d);
		xdNode.children.forEach((child) => {
			_dumpNodePluginData(child, d + 1);
		});
	};
	for (let i = 0; i < selection.items.length; ++i) {
		let item = selection.items[i];
		_dumpNodePluginData(item);
	}
}

function imageFlipTest() {
	let items = xd.selection.items, imgSrc, target;
	for (let i=0; i < items.length; i++) {
		let o = items[i];
		if (o.fill instanceof xd.ImageFill) { imgSrc = o; }
		else if (o instanceof xd.Rectangle) { target = o; }
	}
	if (!imgSrc || !target) { trace("select two rectangles, one with an image fill, one without."); return; }
	target.fill = imgSrc.fill;
	trace("src matrix:", imgSrc.transform);
}

module.exports = {
	// also update in main.jsx & manifest.json
	testDartStyle,
	dumpNodePluginData,
	imageFlipTest,
};
