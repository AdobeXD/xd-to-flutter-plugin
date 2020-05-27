/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

// Serialization methods related to interaction or gestures

const xd = require("scenegraph");

const $ = require("../../utils/utils");
const { trace } = require("../../utils/debug");
const PropType = require("../proptype");
const NodeUtils = require("../../utils/nodeutils");

function getSizedGestureDetector(xdNode, serializer, ctx, paramName, isOwn) {
	if (isOwn) { return ""; }

	let width = $.fix(xdNode.localBounds.width);
	let height = $.fix(xdNode.localBounds.height);
	let str = `Align(alignment: Alignment.topLeft, child: Container(width: ${width}, height: ${height}, child: GestureDetector(onTap: () => ${paramName}?.call()), ), )`;
	return str;
}
exports.getSizedGestureDetector = getSizedGestureDetector;

function getPageLink(xdNode, serializer, ctx, childStr) {
	if (!NodeUtils.getProp(xd.root, PropType.ENABLE_PROTOTYPE) || !xdNode.triggeredInteractions.length) {
		return childStr;
	}

	let interaction = xdNode.triggeredInteractions[0];
	if (xdNode.triggeredInteractions.length > 1) {
		ctx.log.warn(`Multiple interactions on one object is not unsupported.`, xdNode);
		return childStr;
	}
	if (interaction.trigger.type !== "tap") {
		ctx.log.warn(`Trigger unsupported ('${interaction.trigger.type}'), only tap triggered are supported.`, xdNode);
		return childStr;
	}

	let action = interaction.action, transition = action.transition;
	let builderParam = "", durationParam = "", easeParam = "", transitionParam = "";
	if (action.type === "goToArtboard") {
		let artboard = ctx.getArtboardFromXdNode(action.destination);
		if (!artboard) {
			trace(`Didn't add PageLink for destination artboard '${action.destination.name}' because it was not found. This is likely due to a duplicate name.`);
			return childStr;
		}

		transitionParam = _getTransitionParam(transition);
		if (!transitionParam) { ctx.log.warn(`Transition type not supported: '${transition.type}'.`, xdNode); }
		easeParam = _getEaseParam(transition);
		if (!easeParam) { ctx.log.warn(`Ease not supported: '${transition.easing}'.`, xdNode); }

		builderParam = `pageBuilder: () => ${artboard.toString(serializer, ctx)}, `;
		durationParam = _getDurationParam(transition);
	} else if (action.type === "goBack") {
		// do nothing, PageLink treats an empty builder as "go back".
	} else {
		ctx.log.warn(`Action type '${action.type}' unsupported.`, xdNode);
		return childStr;
	}
	return `PageLink(links: [PageLinkInfo(${transitionParam}${easeParam}${durationParam}${builderParam}), ], child: ${childStr}, )`;
}
exports.getPageLink = getPageLink;


function _getTransitionParam(transition) {
	let type = TRANSITION_TYPE_MAP[transition.type] || "";
	let dir = TRANSITION_SIDE_MAP[transition.fromSide] || "";
	return type && `transition: LinkTransition.${type}${dir}, `;
}

function _getEaseParam(transition) {
	let ease = TRANSITION_EASE_MAP[transition.easing] || "";
	return ease && `ease: Curves.${ease}, `;
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