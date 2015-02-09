/* global console, require, module  */
(function () {
	'use strict';

	var style = require("style-format");
	var guardian = require('./guardian');
	var failingCode = require('failing-code');
	var util = require('util');
	var format = require('util').format;
	var template = style('\nTest results: {green}%d{reset} Passed {red}%d{reset} Failed\r');
	var guard = guardian();
	var assure = guard.assure;
	var charm = require('charm');
	var color = require('color');
	var expect = require('./jasmineExpect');

	guard.duty(function Facts(data) {
		var r = format(template, guard.report().pass, guard.report().fail);
		var message = format.apply(null, data) || "Assurance Failure";
		console.log(failingCode(new Error(message), undefined, 2)[1].code);
		process.stderr.write(message);
		return message;
	});

	function pass() {
		return {
			result: true
		};
	}

	function fail() {
		return {
			result: false
		};
	}

	(function verifyGuardReport() {
		var result = guardian([pass(), pass(), fail()])
			.report();

		var report = JSON.stringify(guardian().report());
		assure(report === '{"pass":0,"fail":0,"notes":[]}', report);
		assure(result.pass === 2, 'Expected 3 but got:', result.pass);
		assure(result.fail === 1, 'Expected 2 but got:', result.fail);
		assure(JSON.stringify(
			result.notes) === '[]');
	}());

	(function guard() {
		var result = guardian().duty(function () {
			return 'woah';
		}).assure(false, '1').report();

		assure(JSON.stringify(result.notes) == '["woah"]');
	}());

	(function verifyGuardNotes() {
		var result = guardian().duty(function (data) {
			return data[0];
		}).assure(false, '1').report();

		assure(JSON.stringify(result.notes) == '["1"]', result.notes);
	}());

	assure(expect([]).toBeArray(), 'woah');


	var r = format(template, guard.report().pass, guard.report().fail);
	process.stdout.write(r);
	module.exports = guard.report();
}());