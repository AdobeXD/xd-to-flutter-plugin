/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

class Parameter {
	constructor(name, type=null, value=null) {
		this.name = name;
		this.type = type; // the Dart type
		this.value = value; // always the string value or null
	}
}
exports.Parameter = Parameter;
