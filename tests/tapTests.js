module.exports = function (guardian) {
	var result = [];
	guardian.Guard = guardian.Tap;
	guardian.Guard.log = function (msg) {
		result.push(msg);
	};

	var tap = guardian().start(),
		test = tap.test('what a test', false),
		test2 = tap.test('what again', true);
	tap.end();

	return {
		'test has a name': test.name === 'what a test',
		'test has failed': test.pass === false,
		'test begot test': test instanceof guardian.Guard,
		'tap start works': result[0] === 'TAP version 13',
		'tap output fail': result[1] === "not ok 1 - what a test",
		'tap output pass': result[2] === "ok 2 - what again",
		'tap output ends': result[3] === '1..2',
	};
};