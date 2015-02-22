#!/usr/bin/env node

(function () {
	'use strict';

	function mergeResults(fails, results) {
		return fails + Object.keys(results)
			.reduce(function (fails, test) {
				return results[test] ? fails : fails + "\nFailure: " + test;
			}, '');
	}

	function failureMessage() {
		return Array.prototype.slice.call(arguments, 0)
			.reduce(mergeResults, '');
	}

	var guardian = require('./guardian');
	var basicTests = require('./basicTests');
	var reportingTests = require('./reportingTests');


	var tests = [basicTests(guardian), reportingTests(guardian)];
	var failures = failureMessage.apply(null, tests);
	if (failures) throw new Error(failures);

	console.log('Tests executed on: ', new Date());
}());