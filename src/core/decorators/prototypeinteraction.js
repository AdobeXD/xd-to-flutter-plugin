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

const $ = require("../../utils/utils");
const NodeUtils = require("../../utils/nodeutils");
const { AbstractDecorator } = require("./abstractdecorator");
const PropType = require("../proptype");

class PrototypeInteraction extends AbstractDecorator {
	static create(node, ctx) {
		if (NodeUtils.getInteractionCount(node.xdNode) < 1) { return; }

		let xdNode = node.xdNode, list = xdNode.triggeredInteractions, interaction = list[0];
		if (list.length > 1) {
			return ctx.log.warn(`Multiple prototype interactions on one object is not supported.`, xdNode);
		}
		if (interaction.trigger.type !== "tap") {
			return ctx.log.warn(`Unsupported trigger '${interaction.trigger.type}'. Only tap is supported.`, xdNode);
		}
		let type = interaction.action.type;
		if (type !== "goToArtboard" && type !== "goBack") {
			return ctx.log.warn(`Unsupported action type '${type}'.`, xdNode);
		}
		ctx.addImport("package:adobe_xd/page_link.dart");
		return new PrototypeInteraction(node, ctx);
	}

	_serialize(nodeStr, ctx) {
		let xdNode = this.node.xdNode, interaction = xdNode.triggeredInteractions[0];
		let action = interaction.action, transition = action.transition;
		if (action.type === "goBack") {
			// PageLink treats an empty builder as "go back".
			return `PageLink(links: [PageLinkInfo(), ], child: ${nodeStr}, )`;
		}
		// goToArtboard.
		let artboard = ctx.getArtboardFromXdNode(action.destination);
		if (!artboard) {
			ctx.log.error(`Couldn't add prototype link to '${action.destination.name}'. This is likely due to a duplicate Artboard name.`);
			return nodeStr;
		}
		return 'PageLink(' +
			'links: [PageLinkInfo(' +
				_getTransitionParam(transition, ctx) +
				_getEaseParam(transition, ctx) +
				_getDurationParam(transition) +
				`pageBuilder: () => ${artboard.serialize(ctx)}, ` +
			'), ], ' + 
			`child: ${nodeStr}, ` +
		')';
	}
}
exports.PrototypeInteraction = PrototypeInteraction;

function _getTransitionParam(transition, ctx) {
	let type = TRANSITION_TYPE_MAP[transition.type] || "";
	let dir = TRANSITION_SIDE_MAP[transition.fromSide] || "";
	if (!type) { ctx.log.warn(`Transition type not supported: '${transition.type}'.`, xdNode); }
	return !type ? '' : `transition: LinkTransition.${type}${dir}, `;
}

function _getEaseParam(transition, ctx) {
	let ease = TRANSITION_EASE_MAP[transition.easing] || "";
	if (!ease) { ctx.log.warn(`Ease not supported: '${transition.easing}'.`, xdNode); }
	return !ease ? '' : `ease: Curves.${ease}, `;
}

function _getDurationParam(transition) {
	return `duration: ${$.fix(transition.duration, 4)}, `;
}

const TRANSITION_TYPE_MAP = {
	"slide": "Slide",
	"push": "Push",
	"dissolve": "Fade",
}

const TRANSITION_SIDE_MAP = {
	"L": "Left",
	"R": "Right",
	"T": "Up",
	"B": "Down"
}

const TRANSITION_EASE_MAP = {
	"linear": "linear",
	"ease-in": "easeIn",
	"ease-out": "easeOut",
	"ease-in-out": "easeInOut",
	"wind-up": "slowMiddle",
	"bounce": "bounceIn",
	"snap": "easeInOutExpo",
}