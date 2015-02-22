#!/usr/bin/env node

'use strict';

function Test(tests) {}

function guardian(tests) {
	tests = tests || [];
	return {
		test: function () {
			return Object.create(Test.prototype, {
				result: {
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
	};
}

guardian.Test = Test;

module.exports = guardian;