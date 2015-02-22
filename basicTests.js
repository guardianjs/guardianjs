module.exports = function (guardian) {
	'use strict';

	var tests,
		test = guardian(tests = []),
		passing = test.assert(true),
		failing = test.assert(false);

	return {
		'Create universe, then pie.': test instanceof guardian.Test,
		'Passing result is test.': passing instanceof guardian.Test,
		'Failing result is test.': failing instanceof guardian.Test,
		'Passing is not failing.': passing !== failing,
		'Need passing test.': passing.pass === true,
		'Need failing test.': failing.pass === false,
		'Tests has passing test.': passing === tests[0],
		'Tests has failing test.': failing === tests[1],
	};
};