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
const iconPlugin = require('./assets/icon@2x.png');

// docs for dialog UI: https://adobexdplatform.com/plugin-docs/reference/ui/dialogs/

let dialog, callback;

function closeDialog(value, e) {
	e && e.preventDefault();
	callback && callback(value, dialog);
    dialog && dialog.close(value);
	dialog = callback = null;
}

async function openDialog(contents, cb=null) {
	// returns true if the user clicked the cta
	dialog = document.createElement('dialog');
	callback = cb;
	render(contents, dialog);
	let value = await document.body.appendChild(dialog).showModal();
	if (value === "reasonCanceled") { value = null; } // esc key pressed
	return value;
}

function Chrome(title, content, cancel, cta='OK') {
	// currently returns true if the cta is clicked, false if cancel is clicked
	// callback is called with the return value before the dialog is closed, to maintain edit privileges
	return <form method="dialog" onSubmit={(e) => closeDialog(true, e)}>
		{title && <Fragment>
			<h1>
				<img class="icon" src={iconPlugin.default} />
				<span>{title}</span>
			</h1>
			<hr/>
		</Fragment>}
		{content}
		<footer>
			{cancel && <button onClick={(e) => closeDialog(false, e)} type="reset" uxp-variant="primary">{cancel}</button>}
			<button type="submit" uxp-variant="cta" uxp-selected="true" autofocus="autofocus">{cta}</button>
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
		'Copy To Clipboard', 'Close'
		),
		(v,_) => (v === false) && copyResults(results)
	);
}

async function codeEditorAlert(code, handler) {
	return await openDialog(Chrome(
		"Custom Code",
		<Fragment>
			<p class="text">
				Paste code here without a trailing semicolon or comma.
				Read the Custom Code section of the <a href="https://github.com/AdobeXD/xd-to-flutter-plugin/blob/master/README.md">README</a> for more info.
			</p>
			<p class="text-information">Unfortunately, XD plugin limitations prevent showing a proper code editor here.</p>
			<textarea class="code-editor" id="editor" value={code || ''} onKeyDown={(o) => o.preventDefault()}/>
		</Fragment>,
		'Cancel', 'Save'
		),
		(v,d) => v && handler(d.querySelector('#editor').value),
	);
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

module.exports = { alert, prompt, projectAlert, resultsAlert, codeEditorAlert };