function trace(...rest) {
	false && console.log(...rest);
}
exports.trace = trace;
