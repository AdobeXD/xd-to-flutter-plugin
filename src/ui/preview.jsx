/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const { h, Component, Fragment } = require('preact');
const NodeType = require('../core/nodetype');
const render_preview = require('./render_preview');
const { trace } = require('../utils/trace');


class Preview extends Component {
    constructor(props) {
        super(props);
		this.state = { rendition: '' }
    }

    componentDidMount() {
		this.renderPreview(this.props.node);
    }

    shouldComponentUpdate(nextProps, nextState) {
		// render new preview only if the props changed:
		if (this.props !== nextProps) { this.renderPreview(nextProps.node); }
		return true;
    }

    async renderPreview(node) {
		try {
			this.setState({ rendition: await render_preview.getPreview(node) });
		} catch (e) {
			trace('error rendering preview', e);
		}
	}

    render() {
		let isMultiple = !this.props.node;
		let noPreview = isMultiple || this.state.rendition === null;
		let label = isMultiple ? 'MULTIPLE' : NodeType.getXDLabel(this.props.node);
        return (
			<div class='preview-container'>
				<div class={`preview-canvas${noPreview ? ' multi' : ' '}`}>
					<img class='preview-img' src={this.state.rendition} alt="preview" />
					<div class='preview-no label'>PREVIEW NOT AVAILABLE</div>
				</div>
				<span class='label'>SELECTION: <b>{label.toUpperCase()}</b> </span>
				<span class='separator' />
			</div>
        );
    }
}



module.exports = Preview;