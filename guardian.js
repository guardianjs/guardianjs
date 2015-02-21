#!/usr/bin/env node

'use strict';

function Test(name, tests) {
	this.name = name;
	this.result = function (pass) {
		this.pass = pass;
		tests.push(this);
		return this;
	};
}

function guardian(tests) {
	tests = tests || [];
	return {
		test: function (name) {
			return new Test(name, tests);
		}
	};
}

guardian.Test = Test;

module.exports = guardian;