/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const { editDocument } = require("application");
const { h, Fragment } = require("preact");

const NodeUtils = require("../core/nodeutils");
const $ = require("../core/utils");
const PropType = require("../core/proptype");


function initInputHandlers(component) {
    // Inject a button handler, that passes the current component to the shared handler to retain scope
    component.handleInput = (e) => handleNodeInputChanged(component, e);

    component.handleBlurAsCleanPath = (e) => handleBlur(component, e, $.cleanPath);
    component.handleBlurAsClassName = (e) => handleBlur(component, e, $.cleanVarName);
};

//Handles any input changes, and writes them into the node metadata
function handleNodeInputChanged(c, event) {
    // TODO: DC: this should probably be cleaned up.
    let name = event.target.name;
    let value = event.target.type == 'checkbox' ? !c.state[name] : event.target.value;

    editDocument({ editLabel: "Updated Flutter Data" }, function (selection) {
        if (name === PropType.FLUTTER_FONT) {
            NodeUtils.setFlutterFont(c.props.node.fontFamily, value);
        } else if (name === PropType.IMAGE_FILL_NAME) {
            NodeUtils.setImageName(c.props.node, value);
        } else {
            // Update component state
            let state = c.state;
            state[name] = value;
            // Inject latest component state, into the node's metadata
			let node = c.props.node;
            //NodeUtils.setProp(node, name, value);
            NodeUtils.setState(node, state);
        }
    });
    c.setState({ [name]: value })
}


function handleBlur(c, event, cleanFxn) {
    let name = event.target.name;
    let value = cleanFxn(c.state[name]);
    let node = c.props.node;

    editDocument({ editLabel: "Updated Flutter Data" }, function (_) {
        let state = c.state;
        state[name] = value;
        //NodeUtils.setProp(node, name, value);
        NodeUtils.setState(node, state);
    });

    c.setState({ [name]: value })
}

function TextInputWithLabel(props) {
    return (
        <Fragment>
            {Label(props)}
            {TextInput(props)}
        </Fragment>
    );
}

function TextInput(props) {
    return (<input type="text" class='settings__text-input'
        name={props.name}
        onblur={props.onBlur}
        placeholder={props.placeholder}
		onInput={props.handleInput}
		readonly={props.readonly}
        value={props.state[props.name] || ''}
    />);
}

function Label(props) {
    return (<label class='label'>{props.label}</label>);
}

function Checkbox(props) {
    return (
        <label class='settings__checkbox-label'>
            <input type="checkbox"
                name={props.name}
                onClick={props.handleInput}
                checked={props.state[props.name] || false}
            />
            <span>{props.label}</span>
        </label>
    );
}

module.exports = {
    initInputHandlers,
    TextInputWithLabel,
    TextInput,
    Label,
    Checkbox
};
