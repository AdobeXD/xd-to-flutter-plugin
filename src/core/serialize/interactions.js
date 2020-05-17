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

const $ = require("../utils");
const PropType = require("../proptype");
const NodeUtils = require("../nodeutils");

function getSizedGestureDetector(xdNode, serializer, ctx, paramName, isOwn) {
	if (isOwn) { return ""; }

	let width = $.fix(xdNode.localBounds.width);
	let height = $.fix(xdNode.localBounds.height);
	let str = `Align(alignment: Alignment.topLeft, child: Container(width: ${width}, height: ${height}, child: GestureDetector(onTap: () => ${paramName}?.call()), ), )`;
	return str;
}
exports.getSizedGestureDetector = getSizedGestureDetector;

function getPageLink(xdNode, serializer, ctx, child) {
	if (NodeUtils.getProp(xd.root, PropType.ENABLE_PROTOTYPE) && xdNode.triggeredInteractions.length) {
		let interaction = xdNode.triggeredInteractions[0];
		if (xdNode.triggeredInteractions.length > 1) {
			ctx.log.warn(`Multiple interactions on one object is not unsupported.`, xdNode);
		}
		if (interaction.trigger.type !== "tap") {
			ctx.log.warn(`Trigger unsupported ('${interaction.trigger.type}'), only tap triggered are supported.`, xdNode);
		}
		let builder = "";
		let duration = "";
		let ease = "";
		let transition = "";
		if (interaction.action.type === "goToArtboard") {
			if (interaction.action.transition.type === "slide") {
				switch (interaction.action.transition.fromSide) {
					case "L":
						transition = "transition: LinkTransition.SlideLeft";
						break;
					case "R":
						transition = "transition: LinkTransition.SlideRight";
						break;
					case "T":
						transition = "transition: LinkTransition.SlideDown";
						break;
					case "B":
						transition = "transition: LinkTransition.SlideUp";
						break;
				}
			} else if (interaction.action.transition.type === "push") {
				switch (interaction.action.transition.fromSide) {
					case "L":
						transition = "transition: LinkTransition.PushLeft";
						break;
					case "R":
						transition = "transition: LinkTransition.PushRight";
						break;
					case "T":
						transition = "transition: LinkTransition.PushDown";
						break;
					case "B":
						transition = "transition: LinkTransition.PushUp";
						break;
				}
			} else if (interaction.action.transition.type === "dissolve") {
				transition = "transition: LinkTransition.Fade";
			} else {
				ctx.log.warn(`Transition type not supported: ${interaction.action.transition.type}.`, xdNode);
			}
			let artboard = ctx.getArtboardFromXdNode(interaction.action.destination);
			builder = `pageBuilder: () => ${artboard.toString(serializer, ctx)}`;
			duration = `duration: ${$.fix(interaction.action.transition.duration, 4)}`;
			switch (interaction.action.transition.easing) {
				case "linear":
					ease = "ease: Curves.linear";
					break;
				case "ease-in":
					ease = "ease: Curves.easeIn";
					break;
				case "ease-out":
					ease = "ease: Curves.easeOut";
					break;
				case "ease-in-out":
					ease = "ease: Curves.easeInOut";
					break;
				case "wind-up":
					ease = "ease: Curves.slowMiddle"; // TODO: CE: Find correct ease function
					break;
				case "bounce":
					ease = "ease: Curves.bounceIn";
					break;
				case "snap":
					ease = "ease: Curves.easeInOutExpo"; // TODO: CE: Find correct ease function
					break;
				default:
					ctx.log.warn(`Ease '${interaction.action.transition.easing}' unsupported.`, xdNode);
					ease = "";
					break;
			}
		} else if (interaction.action.type === "goBack") {
			builder = "";
		} else {
			ctx.log.warn(`Action type '${interaction.action.type}' unsupported.`, xdNode);
		}
		if (transition) transition += ",";
		if (duration) duration += ",";
		if (ease) ease += ",";
		if (builder) builder += ",";
		let str = `PageLink(links: [PageLinkInfo(${transition}${duration}${ease}${builder}), ], child: ${child}, )`;
		return str;
	} else {
		return child;
	}
}
exports.getPageLink = getPageLink;