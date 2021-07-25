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
const { editDocument } = require("application");
const { h, Component, Fragment } = require("preact");

const $ = require("../utils/utils");
const { project } = require('../core/project');
const NodeUtils = require("../utils/nodeutils");
const { initInputHandlers, TextInputWithLabel, Label, TextInput, TextArea, Checkbox, Select } = require("./formutils");

const NodeType = require("../core/nodetype");
const PropType = require("../core/proptype");
const { DEFAULT_PLUGIN_DATA, DEFAULT_COLORS_CLASS_NAME, DEFAULT_CHAR_STYLES_CLASS_NAME } = require("../core/constants");
const { DefaultPath } = require("../core/project");
const Alert = require("./alert");

const iconFolder = require('./assets/icon-folder.png');
const iconEdit = require('./assets/icon-edit.png');
const iconWarning = require('./assets/icon-warning.png');
const iconInfo = require('./assets/icon-info.png');

const { ExportMode, ExportModeOptions, DEFAULT_CUSTOM_CODE } = require('../core/constants');

function Settings(props) {
	let type = NodeType.getType(props.node);
	if (props.multi) {
		return <div>Select a single element to modify settings.</div>;
	}
	if (isComponentInstance(props) && !hasImage(props)) {
		return <ComponentWarning key={props.node.guid} {...props} />;
	}
    switch (type) {
        case NodeType.TEXT:
            return <TextSettings key={props.node.guid} {...props} />;
        case NodeType.GROUP:
            return <GroupSettings key={props.node.guid} {...props} />;
		case NodeType.GRID:
            return <GridSettings key={props.node.guid} {...props} />;
        case NodeType.WIDGET:
            return <WidgetSettings key={props.node.guid} {...props} />;
        case NodeType.SHAPE:
            return <ShapeSettings key={props.node.guid} {...props} />;
        default:
            return <ProjectSettings {...props} />;
    }
}
module.exports = Settings;

function isComponentInstance(props) {
	return props.component && !props.component.isMaster
}

function hasImage(props) {
	return props.node.fill && props.node.fill instanceof xd.ImageFill
}

class ComponentWarning extends Component {
    constructor(props) {
        super(props);
    }

    render(_, state) {
        return (
			<div class='settings-container'>
				{getWarning(this.props)}
			</div>
        );
    }
}

function getWarning(props, some=false) {
	let isComponent = props.node === props.component;
	let type = isComponent ? 'element' : NodeType.getXDLabel(props.node);
	return <div class="warning">
		{some ? <span class='separator'/> : null}
		<div class="warning-row">
			<img src={iconWarning.default} alt="icon" class="icon" />
			<div>EDITING COMPONENT</div>
		</div>
		<div class="warning-text">
			<p>
			The selected {type} is {isComponent ? '' : 'part of'} a component instance.
			</p><p>
			To modify {some ? 'some ' : ''}settings on this {type} you must edit the Master Component.
			</p><p>
			Press <b>{$.getCmdKeyStr()}-Shift-K</b> to locate the Master Component.
			</p>
		</div>
	</div>
}


class ProjectSettings extends Component {
    constructor(props) {
        super(props);
        initInputHandlers(this);
        this.state = xd.root.pluginData || DEFAULT_PLUGIN_DATA;
    }

    setProjectFolder() {
        editDocument((_) => project.promptForRoot());
    }

    shouldComponentUpdate() {
        this.setState(NodeUtils.getState(xd.root));
    }

    render(_, state) {
        return (
            <div class='settings-container'>
                <Label label={"FLUTTER PROJECT"} />
                <div class='project-row'>
                    <TextInput name={PropType.EXPORT_PATH} placeholder={DefaultPath.ROOT} state={state} handleInput={this.handleInput} readonly />
                    <button uxp-variant="action" onClick={this.setProjectFolder}><img src={iconFolder.default} alt="icon-folder" /></button>
                </div>

                <TextInputWithLabel
                    name={PropType.CODE_PATH}
                    label={"CODE PATH"}
                    placeholder={DefaultPath.CODE}
                    state={state}
                    handleInput={this.handleInput}
                    onBlur={this.handleBlurAsCleanPath} />

                <TextInputWithLabel
                    name={PropType.IMAGE_PATH}
                    label={"IMAGE PATH"}
                    placeholder={DefaultPath.IMAGE}
                    state={state}
                    handleInput={this.handleInput}
                    onBlur={this.handleBlurAsCleanPath} />

                <TextInputWithLabel
                    name={PropType.WIDGET_PREFIX}
					label={"WIDGET NAME PREFIX"}
					placeholder=''
                    state={state}
                    handleInput={this.handleInput}
                    onBlur={this.handleBlurAsClassName} />


                <span class='separator' />
                <label class='label'>SETTINGS</label>

                <div class='wrapping-row'>
                    <Checkbox
                        name={PropType.ENABLE_PROTOTYPE}
                        label={"Prototype Interactions"}
                        state={state}
                        handleInput={this.handleInput} />

                    <Checkbox
                        name={PropType.RESOLUTION_AWARE}
                        label={"Resolution Aware Images"}
                        state={state}
                        handleInput={this.handleInput} />

					<Checkbox
						name={PropType.NULL_SAFE}
						label={"Export Null Safe Code"}
						state={state}
						handleInput={this.handleInput} />

                    <Checkbox
                        name={PropType.NORMALIZE_NAME_CASE}
                        label={"Normalize Names"}
                        state={state}
                        handleInput={this.handleInput} />
                </div>

                <span class='separator' />
                <label class='label'>EXPORT ASSETS</label>

				<Checkbox
					name={PropType.EXPORT_COLORS}
					label={"Colors"}
					state={state}
					handleInput={this.handleInput} />
				
				{!state[PropType.EXPORT_COLORS] ? null :
				<TextInput
					name={PropType.COLORS_CLASS_NAME}
					placeholder={DEFAULT_COLORS_CLASS_NAME}
					state={state}
					handleInput={this.handleInput}
					onBlur={this.handleBlurAsClassName} />
				}

				<Checkbox
					name={PropType.EXPORT_CHAR_STYLES}
					label={"Character Styles"}
					state={state}
					handleInput={this.handleInput} />
				
				{!state[PropType.EXPORT_CHAR_STYLES] ? null :
				<TextInput
					name={PropType.CHAR_STYLES_CLASS_NAME}
					placeholder={DEFAULT_CHAR_STYLES_CLASS_NAME}
					state={state}
					handleInput={this.handleInput}
					onBlur={this.handleBlurAsClassName} />
				}
            </div>
        );
    }
}

class TextSettings extends Component {
    constructor(props) {
        super(props);
        initInputHandlers(this);
        let state = this.props.node.pluginData || {};
        state.flutterFont = NodeUtils.getFlutterFont(this.props.node.fontFamily);
        this.state = state;
    }

    shouldComponentUpdate(nextProps) {
        let state = nextProps.node.pluginData || {};
        state[PropType.FLUTTER_FONT] = NodeUtils.getFlutterFont(nextProps.node.fontFamily);
        this.setState(state);
    }

    render(_, state) {
        return (
            <div class='settings-container'>
                <TextInputWithLabel
                    name={PropType.FLUTTER_FONT}
                    label={"FLUTTER FONT"}
                    placeholder={this.props.node.fontFamily}
                    state={state}
                    handleInput={this.handleInput} />

                <TextInputWithLabel
                    name={PropType.TEXT_PARAM_NAME}
                    label={"TEXT PARAMETER"}
                    state={state}
                    handleInput={this.handleInput}
                    onBlur={this.handleBlurAsClassName} />

                <TextInputWithLabel
                    name={PropType.COLOR_PARAM_NAME}
                    label={"COLOR PARAMETER"}
                    state={state}
                    handleInput={this.handleInput}
                    onBlur={this.handleBlurAsClassName} />
            </div>
        );
    }
}

class WidgetSettings extends Component {
    constructor(props) {
        super(props);
        initInputHandlers(this);
		this.state = props.node.pluginData || {[PropType.INCLUDE_IN_EXPORT_PROJECT]:true};
    }

    shouldComponentUpdate() {
		// this is necessary to react to Undo
        this.setState(NodeUtils.getState(this.props.node));
    }

    render(_, state) {
		let isComponent = this.props.node instanceof xd.SymbolInstance;
        return (
            <div class='settings-container'>
                <Checkbox
                    name={PropType.INCLUDE_IN_EXPORT_PROJECT}
                    label={"Include in Export All Widgets"}
                    state={state}
                    handleInput={this.handleInput} />

                <TextInputWithLabel
                    name={PropType.WIDGET_NAME}
					label={"WIDGET NAME"}
					placeholder={NodeUtils.getDefaultWidgetName(this.props.node)}
                    state={state}
                    handleInput={this.handleInput}
                    onBlur={this.handleBlurAsClassName} />

                {isComponent && <TextInputWithLabel
                    name={PropType.TAP_CALLBACK_NAME}
                    label={"TAP CALLBACK NAME"}
                    state={state}
                    handleInput={this.handleInput}
                    onBlur={this.handleBlurAsClassName} />}
            </div>
        );
    }
}

class GridSettings extends Component {
    constructor(props) {
        super(props);
        initInputHandlers(this);
		this.state = props.node.pluginData || {};
    }

    shouldComponentUpdate() {
		// this is necessary to react to Undo
        this.setState(NodeUtils.getState(this.props.node));
    }

    render(_, state) {
		let hasParam = !!state[PropType.DATA_PARAM_NAME];
        return (
            <div class='settings-container'>

				<TextInputWithLabel
                    name={PropType.DATA_PARAM_NAME}
                    label={"DATA PARAMETER"}
                    state={state}
                    handleInput={this.handleInput}
                    onBlur={this.handleBlurAsClassName} />
				
				{
				!hasParam ? null :
					<p class="note"><img src={iconInfo.default}/> the data parameter value will default to an empty list.</p>
				}

            </div>
        );
    }
}

class ShapeSettings extends Component {
    constructor(props) {
        super(props);
        initInputHandlers(this);
        let state = props.node.pluginData || {};
        state[PropType.IMAGE_FILL_NAME] = NodeUtils.getImageName(props.node);
        this.state = state;
    }

    shouldComponentUpdate(nextProps) {
        let state = nextProps.pluginData || {};
        state[PropType.IMAGE_FILL_NAME] = NodeUtils.getImageName(nextProps.node);
        this.setState(state);
        return true;
    }

    render(_, state) {
        return (!hasImage(this.props) ? null :
            <div class='settings-container'>
				
				<TextInputWithLabel
					name={PropType.IMAGE_FILL_NAME}
					label={"IMAGE EXPORT NAME"}
					state={state}
					handleInput={this.handleInput} />
				{isComponentInstance(this.props) ?
					getWarning(this.props, true)
					:
					<TextInputWithLabel
						name={PropType.IMAGE_PARAM_NAME}
						label={"IMAGE PARAMETER"}
						state={state}
						handleInput={this.handleInput}
						onBlur={this.handleBlurAsClassName} />
				}
			</div>
        );
    }
}

class GroupSettings extends Component {
    constructor(props) {
        super(props);
        initInputHandlers(this);
        this.state = props.node.pluginData || {};
    }

    shouldComponentUpdate() {
		// this is necessary to react to Undo
        this.setState(NodeUtils.getState(this.props.node));
    }

    render(_, state) {
        return (
            <div class='settings-container'>
				<Select
					name={PropType.EXPORT_MODE}
					options={ExportModeOptions}
					default={true}
					state={state}
					handleInput={this.handleInput}/>
				
				{this.renderModeOptions(state)}
            </div>
        );
    }

	renderModeOptions(state) {
		let arr = [], mode = state[PropType.EXPORT_MODE];
		if (mode === ExportMode.CUSTOM) {
			let code = state[PropType.CUSTOM_CODE] || DEFAULT_CUSTOM_CODE;
			arr.push(<div class='customcode-row'>
					<TextArea
						name={PropType.CUSTOM_CODE}
						state={state}
						placeholder={DEFAULT_CUSTOM_CODE}
						handleInput={this.handleInput}
						onBlur={this.handleBlurAsCustomCode} />
					<button
						uxp-variant="action"
						onClick={() => this.openCodeEditor(code)}>
							<img src={iconEdit.default} alt="icon-edit" />
						</button>
				</div>)
		}
		if (mode === ExportMode.METHOD || mode === ExportMode.BUILDER) {
			arr.push(<TextInput
				name={PropType.BUILD_METHOD_NAME}
				placeholder={NodeUtils.getDefaultBuildMethodName(this.props.node)}
				state={state}
				handleInput={this.handleInput}
				onBlur={this.handleBlurAsClassName} />);
		}
		if (mode === ExportMode.METHOD || mode === ExportMode.INLINE) {
			
			arr.push(<TextInputWithLabel
				name={PropType.TAP_CALLBACK_NAME}
				label={"TAP CALLBACK NAME"}
				state={state}
				handleInput={this.handleInput}
				onBlur={this.handleBlurAsClassName} />);

			arr.push(<Checkbox
				name={PropType.COMBINE_SHAPES}
				label={"Combine Shapes"}
				state={state}
				handleInput={this.handleInput} />);
		}
		
		return arr;
	}

	async openCodeEditor(code) {
		await Alert.codeEditorAlert(code, (value) => {
			let name = PropType.CUSTOM_CODE;
			if (value === DEFAULT_CUSTOM_CODE) { value = null; }
            else { value = $.cleanCustomCode(value); }
			editDocument({ editLabel: "Updated Flutter Data" }, (_) => {
				this.state[name] = value;
				NodeUtils.setState(this.props.node, this.state);
			});
			this.setState({ [name]: value })
		});
	}
}

