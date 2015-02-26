module.exports = function (guardian) {
	'use strict';

	var tests = [],
		test = Object.create(guardian({
			tests: tests
		}), {
			name: {
				value: "I'm a test"
			}
		}),
		passing = test.assert(true),
		failing = test.assert(false);

	return {
		'Passing is not failing.': passing !== failing,
		'Need passing test.': passing.pass === true,
		'Need failing test.': failing.pass === false,
		'Tests keep properties': test.name === "I'm a test",
		'Tests has passing test.': passing === tests[0],
		'Tests has failing test.': failing === tests[1]
	};
};