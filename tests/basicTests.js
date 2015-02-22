module.exports = function (guardian) {
	'use strict';

	var tests = [],
		Guard = guardian.Guard,
		test = guardian(tests),
		passing = test.assert(true),
		failing = test.assert(false);

	guardian.Guard = function () {
		this.property = true;
	};

	return {
		'Create universe, then pie.': test instanceof Guard,
		'Passing result is test.': passing instanceof Guard,
		'Failing result is test.': failing instanceof Guard,
		'Passing is not failing.': passing !== failing,
		'Need passing test.': passing.pass === true,
		'Need failing test.': failing.pass === false,
		'Tests has passing test.': passing === tests[0],
		'Tests has failing test.': failing === tests[1],
		'Guard updated has property': guardian().property === true,
	};
};