#!/usr/bin/env node

'use strict';

var guardian = require('./guardian'),
	fs = require('fs');

function mergeResults(fails, results) {
	return fails + Object.keys(results)
		.reduce(function (r, test) {
			return results[test] ? r : r + "\nFailure: " + test;
		}, '');
}

function failureMessage() {
	return Array.prototype.slice.call(arguments, 0)
		.reduce(mergeResults, '');
}

(function executeTests() {
	var start = new Date();
	fs.readdir('tests', function (err, files) {
		var tests = files.map(function (file) {
			return require('./tests/' + file)(guardian);
		});

		var failures = failureMessage.apply(null, tests);
		if (failures) throw new Error(failures);

		console.log('Tests executed in', (new Date() - start) / 1000,'seconds');
	});
}());