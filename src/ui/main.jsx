/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const { h, render, Component } = require("preact");
const { editDocument } = require("application");
const os = require('os');

const Preview = require('./preview');
const Results = require('./results');
const Settings = require('./settings');
const NodeType = require("../core/nodetype");
const nodeutils = require("../core/nodeutils");
require("./styles.styl");

const xd = require("scenegraph");
const image_export = require("../core/image_export");
const dart_export = require("../core/dart_export");
const menu = require('../core/menu_items');
const { trace } = require('../core/trace');

class FlutterPanel extends Component {
	constructor(props) {
		super(props);
		this.state = { context: null }
		props.notifier.listen((o) => this.updateResults(o));
	}

	exportSelectedItem() {
		editDocument({ editLabel: "Export widget" }, async (selected, root) => {
			this.updateResults(await dart_export.exportSelected(selected, root));
		});
	}

	copySelectedItem() {
		trace("test", 1);
		editDocument({ editLabel: "Copy selected item to clipboard" }, async (selected, root) => {
			this.updateResults(await dart_export.copySelected(selected, root));
		});
	}

	exportAll() {
		editDocument({ editLabel: "Export all widgets" }, async (selected, root) => {
			this.updateResults(await dart_export.exportAll(selected, root));
		});
	}

	exportImage() {
		editDocument({ editLabel: "Export image" }, async (selected, root) => {
			this.updateResults(await image_export.exportImage(selected, root));
		});
	}

	exportAllImages() {
		editDocument({ editLabel: "Export all images" }, async (selected, root) => {
			this.updateResults(await image_export.exportAllImages(selected, root));
		});
	}

	updateResults(ctx) {
		this.setState({ context: ctx });
		if (!ctx) { trace("NO RESULT RETURNED!"); return; }
		if (!ctx.log) { trace("UNEXPECTED RESULT OBJECT!"); return; }
		//trace(`${ctx.resultMessage}: ${ctx.log.toString()}`);
	}

	render(props, state) {
		let multi = !!(props.selected && props.selected.length > 1);
		let node = !multi && props.selected && props.selected[0];
		let type = NodeType.getType(node);
		let isRoot = type === NodeType.ROOT;
		let isWidget = nodeutils.isWidget(node);
		let isCopyable = type !== NodeType.ROOT && type !== NodeType.WIDGET;
		let hasImage = node && node.fill && node.fill instanceof xd.ImageFill;
		let component = nodeutils.getContainingComponent(node, true);

		return (
			<div id='panel-container' data-platform={os.platform()}>
				<div class='options-container'>
					{!isRoot || multi ? <Preview node={node} /> : null}
					<Settings node={isRoot ? xd.root : node} component={component} multi={multi} />
				</div>
				<div class='actions-container'>
					<Results context={state.context} node={node} />
					<span class='separator' />
					{hasImage ? <button uxp-variant="primary" onClick={() => this.exportImage()}>Export Image</button> : null}
					{isCopyable ? <button uxp-variant="primary" onClick={() => this.copySelectedItem()}>Copy Selected</button> : null}
					{isWidget ? <button uxp-variant="primary" onClick={() => this.exportSelectedItem()}>Export Widget</button> : null}
					{isRoot ? <button uxp-variant="primary" onClick={() => this.exportAllImages()}>Export All Images</button> : null}
					<button uxp-variant="cta" onClick={() => this.exportAll()}>Export All Widgets</button>
				</div>
			</div>
		);
	}
}


class Notifier {
	listen(f) { this.f = f; }
	notify(o) { this.f && this.f(o); }
}

let panelHolder, notifier = new Notifier();


function create() {
	if (panelHolder == null) {
		panelHolder = document.createElement("div");
		update();
	}
	return panelHolder
}

function show(event) {
	if (!panelHolder) event.node.appendChild(create());
}

function update(selection) {
	let items = selection && selection.items;
	render(<FlutterPanel key='panel' selected={items} notifier={notifier} />, panelHolder);
}

async function exportAll() {
	notifier.notify(await dart_export.exportAll(null, xd.root));
}

module.exports = {
	panels: {
		flutterPanel: {
			show,
			update,
		}
	},
	commands: {
		exportAll,
		// tests, enable in manifest.json:
		testDartStyle: menu.testDartStyle,
		dumpNodePluginData: menu.dumpNodePluginData,
		imageFlipTest: menu.imageFlipTest,
	}

};
