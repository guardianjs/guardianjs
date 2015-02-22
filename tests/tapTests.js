module.exports = function (guardian) {
	var result = [];
	guardian.Guard = guardian.Tap;
	guardian.Guard.log = function (msg) {
		result.push(msg);
	};

	var guard = guardian(),
		test = guard.test('what a test', false),
		test2 = guard.test('what again', true);

	return {
		'test has name': test.name === 'what a test',
		'test has failed': test.pass === false,
		'test begot test': test instanceof guardian.Guard,
		'tap output fail': result[0] === "not ok 1 - what a test",
		'tap output pass': result[1] === "ok 2 - what again"
	};
};