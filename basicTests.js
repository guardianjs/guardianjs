module.exports = function (guardian) {
	'use strict';

	var tests, guard,
		test = (guard = guardian(tests = [])).test(),
		passing = test.result(true),
		failing = test.result(false);

	var results = {
		'Create universe, then pie.': test instanceof guardian.Test,
		'Passing result is test.': passing instanceof guardian.Test,
		'Failing result is test.': failing instanceof guardian.Test,
		'Passing is not failing.': passing !== failing,
		'Need passing test.': passing.pass === true,
		'Need failing test.': failing.pass === false,
		'Tests has passing test.': passing === tests[0],
		'Tests has failing test.': failing === tests[1],
	};

	function getFailures(fails, test) {
		return results[test] ? fails : "Failure: " + fails + '\n' + test;
	}

	var failures = Object.keys(results).reduce(getFailures, '');
	if (failures) {
		throw new Error(failures);
	}
};