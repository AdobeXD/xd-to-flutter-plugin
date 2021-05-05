/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const { h, Component, Fragment } = require("preact");
const { resultsAlert } = require('./alert');
const version = require('../version');
const { shell } = require('uxp');
const { HELP_URL } = require('../core/constants');

class Results extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.node !== nextProps.node) {
            this.setState({ results: null })
            return true;
        }
        if (this.props.context === nextProps.context) return false;
        if (nextProps.context && nextProps.context.log) {
            this.setState({ results: nextProps.context.log.getResults() })
        }
    }

    render(props, state) {
		if (!version.xdVersionOk) {
			return <div class='results-container'>
				<div class='version alert'>{`Version ${version.xdVersionRequired}+ of Adobe XD is required (v${version.version})`}</div>
			</div>
		}
        if (!props.context || !state.results) {
            return <div class='results-container'>
				<span class={`version${version.debug ? ' alert' : ''}`}>{`${version.label} v${version.version}`}</span>
				<a class='help' href={HELP_URL}>Need help?</a>
			</div>;
        }
        if (!props.context.log) { return <p>UNEXPECTED RESULT OBJECT!</p>; }

		let results = state.results, errorMsg = this.getErrorMsg(results);
        return (<Fragment>
			{results && <div class='results-container'>
				{props.context.resultMessage}{(errorMsg) ? ': ' : '.'}{errorMsg}
			</div>}
		</Fragment> );
	}
	
	getErrorMsg(results) {
		if (!results) { return null; }
		let count = results.errors.length;
		let noun = count ? 'error' : 'warning';
		if (!count) { count = results.warnings.length; }
		let s = count > 1 ? 's' : '';
		return !count ? null : <a onClick={() => resultsAlert(results)}>{`${count} ${noun}${s}`}</a>;
	}
}

module.exports = Results;