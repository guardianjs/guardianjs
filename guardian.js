'use scrict';

function reportReduce(report, test) {
	return (test.pass ?
		report.pass += 1 :
		report.fail += 1) && report;
}

function failures(tests) {
	return tests.filter(function (test) {
		return !test.pass;
	});
}

function report(tests) {
	return tests.reduce(reportReduce, {
		pass: 0,
		fail: 0
	});
}

function guardian(tests) {
	'use strict';

	tests = tests || [];
	var guard = Object.create(guardian.Guard.prototype, {
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
			value: failures.bind(null, tests)
		},
		report: {
			value: report.bind(null, tests)
		}
	});

	guardian.Guard.call(guard);
	return guard;
}

guardian.Guard = function () {};

guardian.Tap = require('./guardian-tap');

module.exports = guardian;