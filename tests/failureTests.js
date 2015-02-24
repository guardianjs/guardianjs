module.exports = function (guardian) {
	'use strict';

	var tests = [],
		guard = guardian({
			tests: tests
		}),
		test1 = Object.create(guard),
		firstFail = test1.assert(true).assert(false),
		test2 = Object.create(guard),
		secondFail = test2.assert(false);

	test1.name = "test1";
	test2.name = "test2";
	var failures = guard.failures();

	function hasFailure(fail) {
		var s = JSON.stringify;
		return failures.some(function (i) {
			return s(i) === s(fail);
		});
	}

	return {
		'guard has two failures': failures.length === 2,
		'failure has none of the methods': failures[0].assert === undefined,
		'failures has firstFail': hasFailure({"pass":false,"name":"test1"}),
		'failures has secondFail': hasFailure({"pass":false,"name":"test2"}),
	};
};