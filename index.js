/* global console */
(function () {
	'use strict';

	function guardian() {
		var tests = [];
		var h = function () {};

		function result(pass) {
			return tests.filter(function (i) {
				return pass === i.result;
			}).length;
		}

		return {
			hook: function (cb) {
				h = cb;
			},
			assure: function (test) {
				tests.push({
					result: test,
					detail: h.apply(null, arguments)
				});
			},
			report: function () {
				return {
					pass: result(true),
					fail: result(false),
					detail: tests.reduce(function (t, i) {
						return i.detail ? t.push(i.detail) && t : t;
					}, [])
				};
			}
		};
	}

	var prettify = require('prettify-error');

	var guard = guardian();
	guard.hook(function (result, message) {
		if (!result) {
			console.log(result);
			console.error(prettify(new Error(message), 2));
		}
	});
	guard.assure(true);
	guard.assure(false, 'This should work so do not be the bad.');
	var r = guard.report();
	console.log('Results: ', r.pass, 'passed', r.fail, 'failed');
}());