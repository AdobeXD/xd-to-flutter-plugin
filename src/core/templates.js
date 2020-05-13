/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

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
