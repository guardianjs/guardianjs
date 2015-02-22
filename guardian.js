#!/usr/bin/env node

'use strict';

function Test() {}

function guardian(tests) {
	tests = tests || [];
	return Object.create(Test.prototype, {
		assert: {
			value: function (pass) {
				var result = Object.create(this, {
					pass: {
						value: pass
					}
				});
				tests.push(result);
				return result;
			}
		}
	});
}

guardian.Test = Test;

module.exports = guardian;