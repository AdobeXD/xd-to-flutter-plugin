const xd = require("scenegraph");
const os = require('os');
const { editDocument } = require("application");
const { h, Component, Fragment } = require("preact");
const { project } = require('../core/project');
const NodeUtils = require("../core/nodeutils");
const { initInputHandlers, TextInputWithLabel, Label, TextInput, Checkbox } = require("./formutils");

const NodeType = require("../core/nodetype");
const PropType = require("../core/proptype");
const { DefaultPath } = require("../core/project");
const folderIcon = require('./assets/icon-folder.png');
const iconWarning = require('./assets/icon-warning.png');

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
	let key = os.platform() === "darwin" ? "Cmd" : "Ctrl";
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
			Press <b>{key}-Shift-K</b> to locate the Master Component.
			</p>
		</div>
	</div>
}


class ProjectSettings extends Component {
    constructor(props) {
        super(props);
        initInputHandlers(this);
		// TODO: GS: should defaults just be proper values instead of placeholders?
		// TODO: GS: the default value should be moved to a constant somewhere.
        this.state = xd.root.pluginData || {[PropType.WIDGET_PREFIX]: 'XD_'};
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
                    <button uxp-variant="action" onClick={this.setProjectFolder}><img src={folderIcon.default} alt="icon-folder" /></button>
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
						name={PropType.EXPORT_COLORS}
						label={"Export Color Assets"}
						state={state}
						handleInput={this.handleInput} />
					
					{!state[PropType.EXPORT_COLORS] ? null :
					<TextInput
						name={PropType.COLORS_CLASS_NAME}
						placeholder='XDColors' // TODO: GS: the default value should be moved to a constant somewhere.
						state={state}
						handleInput={this.handleInput}
						onBlur={this.handleBlurAsClassName} />
					}
                </div>
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
                <TextInputWithLabel
                    name={PropType.TAP_CALLBACK_NAME}
                    label={"TAP CALLBACK NAME"}
                    state={state}
                    handleInput={this.handleInput}
                    onBlur={this.handleBlurAsClassName} />
            </div>
        );
    }
}