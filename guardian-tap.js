/*jslint node: true */
'use strict';
var logTap;

var testCount = 0;

function Tap() {}

Tap.log = console.log;

Tap.prototype.test = function (name, pass) {
	testCount++;
	Tap.log((!pass ? 'not ok ' : 'ok ') + testCount + ' - ' + name);
	return Object.create(this, {
		name: {
			value: name
		}
	}).assert(pass);
};

module.exports = Tap;