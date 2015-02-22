#!/usr/bin/env node

(function () {
	'use strict';

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

	var guardian = require('./guardian');
	var basicTests = require('./tests/basicTests');
	var reportingTests = require('./tests/reportingTests');
	var failureTests = require('./tests/failureTests');

	var tests = [
		basicTests(guardian),
		reportingTests(guardian),
		failureTests(guardian)
	];

	var failures = failureMessage.apply(null, tests);
	if (failures) throw new Error(failures);

	console.log('Tests executed on: ', new Date());
}());