module.exports = function (guardian) {
	'use strict';

	var guard = guardian(),
		firstFail = guard.assert(true).assert(false),
		secondFail = guard.assert(false),
		failures = guard.failures();

	function hasFailure(fail) {
		return failures.some(function (i) {
			return i === secondFail;
		});
	}

	return {
		'guard has two failures': failures.length === 2,
		'failures has firstFail': hasFailure(firstFail),
		'failures has secondFail': hasFailure(secondFail),
	};
};