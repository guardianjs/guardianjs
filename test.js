(function () {
	'use strict';

	var guardian = require('./guardian'), 
		Test = guardian.Test, 
		bruteTest = function (result, messages) {
			if (!result) throw new Error(messages.join(' '));
		};

	(function makeAnApplePie() {
		var name = "Guardian:";
		var tests = [], guard = guardian(tests), given = guard.expect("universe");
	
		bruteTest(guard.tests === tests, [name, "holds onto tests"]);
		bruteTest(tests[0] === given, [name, "expecting creates test"]);
		bruteTest(given instanceof Test, [name, "test is type of Test"]);
		bruteTest(given.actual === "universe", [name, "test holds given value."]);

		var passResult = given.toBe("universe");
		name = "Expect: (passing test)";
		bruteTest(passResult.pass === true, [name, "pass is true."]);
		bruteTest(passResult.message === undefined, [name, "has no message"]);

		var failResult = given.toBe("applepie");
		name = "Expect: (failing test)";
		bruteTest(failResult.pass === false, [name, "pass is false."]);
		bruteTest(failResult.message === "Expected universe to be applepie", 
			[name, "has message."]);
	}());

	(function canReportBasicResults() {
		var name = "Guard Report:";
		var tests = [new Test(true), new Test(false, "t1"), new Test(false, "t2")],
			result = guardian(tests).report();

		bruteTest(result.pass === 1, [name, "Has one passing tests."]);
		bruteTest(result.fail === 2, [name, "Has two failing tests."]);
		bruteTest(result.messages[0] === "t1", [name, "Has first failed message"]);
		bruteTest(result.messages[1] === "t2", [name, "Has second failed message"]);
	}());

	(function ohNoChainedTests() {
		var tests = [], expect = guardian(tests).expect;

	}());

	console.log('pass:', new Date());
}());