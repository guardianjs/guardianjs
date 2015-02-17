function guardian(tests) {
	'use strict';

	tests = tests || [];
	var guard = {};
	guard.tests = tests;
	guard.expect = function (actual) {
		var result = new guardian.Test();
		result.actual = actual;
		tests.push(result);
		return result;
	};
	guard.report = function () {
		return tests.reduce(function(p, i) {
			var r = i.pass ? "pass" : p.messages.push(i.message) && "fail";
			p[r] += 1;
			return p;
		}, {pass: 0, fail: 0, messages: []});
	};

	return guard;
}

guardian.Test = function(result, message) {
	this.pass = result;
	this.message = message;
};

guardian.Test.prototype.toBe = function (expected) {
	this.pass = this.actual === expected;
	if (!this.pass) {
		this.message = "Expected " + this.actual + " to be " + expected;
	}
	return this;
};

module.exports = guardian;