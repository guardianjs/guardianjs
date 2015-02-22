'use scrict';

function Test() {}

function reportReduce(report, test) {
	return (test.pass ?
		report.pass += 1 :
		report.fail += 1) && report;
}

function guardian(tests) {
	'use strict';

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
		},
		report: {
			value: function () {
				return tests.reduce(reportReduce, {
					pass: 0,
					fail: 0
				});
			}
		}
	});
}

guardian.Test = Test;

module.exports = guardian;