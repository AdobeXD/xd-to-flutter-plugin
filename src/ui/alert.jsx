/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const { h, render, Component, Fragment } = require("preact");
const clipboard = require("clipboard");

const iconError = require('./assets/icon-error.png');
const iconWarning = require('./assets/icon-warning.png');

// docs for dialog UI: https://adobexdplatform.com/plugin-docs/reference/ui/dialogs/

let dialog;

function closeDialog(value) {
    dialog && dialog.close(value);
	dialog = null;
}

async function openDialog(contents) {
	// returns true if the user clicked the cta
	dialog = document.createElement('dialog');
	render(contents, dialog);
	return await document.body.appendChild(dialog).showModal() !== false;
}

function Chrome(title, content, cancel, cta='OK', callback) {
	// currently returns true if the cta is clicked, false if cancel is clicked
	// callback is called with the return value before the dialog is closed, to maintain edit privileges
	let close = (value) => {
		callback && callback(value);
		closeDialog(value);
	}
	return <form method="dialog">
		{title && <Fragment>
			<h1>
				<span>{title}</span>
				<img class="icon" src="./assets/icon.png" />
			</h1>
			<hr/>
		</Fragment>}
		{content}
		<footer>
			{cancel && <button onClick={() => close(false)} uxp-variant="primary">{cancel}</button>}
			<button onClick={() => close(true)} uxp-variant="cta" uxp-selected="true" autofocus="autofocus">{cta}</button>
		</footer>
	</form>;
}

async function alert(msg, title=null, closeLabel='OK') {
    await openDialog(Chrome(title, <p dangerouslySetInnerHTML={{__html: msg}}/>, null, closeLabel));
}

async function prompt(msg, title=null, cancelLabel='Cancel', ctaLabel='Continue') {
	// note: html injection is to let us show lists.
    return await openDialog(Chrome(title, <p dangerouslySetInnerHTML={{__html: msg}}/>, cancelLabel, ctaLabel));
}

async function projectAlert(project) {
	return await openDialog(Chrome(
		'Set a Flutter Project Folder',
		<Fragment>
			<p class='text'>Before exporting, you must select the Flutter project folder to export into.</p>
            <p class='text-information'>Due to current restrictions in Adobe XD, you will have to do this each time you open this file.</p>
		</Fragment>,
		'Cancel', 'Continue'
	));
}

async function resultsAlert(results) {
	//results.errors = ["This is an error!"]; // for testing since we throw so few errors.
	return await openDialog(Chrome(
		null, // each category creates it's own header.
		<Fragment>
			{getResultsCategory(results.errors, "Error", iconError)}
			{getResultsCategory(results.warnings, "Warning", iconWarning)}
		</Fragment>,
		'Copy To Clipboard', 'Close',
		(o) => !o && copyResults(results)
	));
}

function copyResults(results) {
	let str = getCategoryString(results.errors, "Error") + '\n\n'
		+ getCategoryString(results.warnings, "Warning");
	clipboard.copyText(str.trim());
}

function getResultsCategory(list, title, icon) {
	let l = list.length;
	return (!l ? null :
		<Fragment>
			<h1>
				<img src={icon.default} alt="icon" class="result-icon" />
				{getCategoryTitle(list, title)}
			</h1>
			<div class='list'>{list.map(o => (
				<div>{o.toString()}</div>
			))}</div>
		</Fragment>
	);
}

function getCategoryString(list, title) {
	if (list.length === 0) { return ''; }
	let str = getCategoryTitle(list, title) + ':';
	return list.reduce((s, o) => s + '\n' + o.toString(), str)
}
function getCategoryTitle(list, title) {
	let l = list.length;
	return l + ' ' + title + (l > 1 ? 's' : '');
}

module.exports = { alert, prompt, projectAlert, resultsAlert };