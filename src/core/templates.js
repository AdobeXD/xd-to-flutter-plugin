const $ = require("./utils");

function view(body, name, params) {
	let cname = $.capitalize(name);
return `
// EXPORTED FROM Adobe XD ARTBOARD: "${name}"
import 'package:flutter/material.dart';
class ${cname} extends StatelessWidget {
${!params ? '' : params.map((o) => `  final ${o.type} ${o.name};\n`).join('') + `
  ${cname}({Key key${!params ? '' : params.map((o) => `, this.${o.name}`).join('')}})
    : super(key: key);
`}
  @override
  Widget build(BuildContext context) {
    return ${body};
  }
}
`
}


exports.view = view;
