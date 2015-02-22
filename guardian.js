'use scrict';

function reportReduce(report, test) {
	return (test.pass ?
		report.pass += 1 :
		report.fail += 1) && report;
}

function guardian(tests) {
	'use strict';

	tests = tests || [];
	var Guard = guardian.Guard;
	var guard = Object.create(Guard.prototype, {
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
		failures: {
			value: function () {
				return tests.filter(function (test) {
					return !test.pass;
				});
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

	Guard.call(guard);
	return guard;
}

guardian.Guard = function () {};

module.exports = guardian;