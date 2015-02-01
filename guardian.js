function guardian() {
	'use strict';
	var tests = [];
	var dutyCall = function () {};

	function result(pass) {
		return tests.filter(function (i) {
			return pass === i.result;
		}).length;
	}

	return {
		duty: function (cb) {
			dutyCall = cb;
			return this;
		},
		assure: function (test) {
			var args = Array.prototype.splice.call(arguments, 1);
			var result = {
				result: test
			};

			var note;
			if (!test && (note = dutyCall(test, args))) {
				result.note = note;
			}
			tests.push(result);
			return this;
		},
		report: function () {
			return {
				pass: result(true),
				fail: result(false),
				notes: tests.reduce(function (t, i) {
					return i.note ? t.push(i.note) && t : t;
				}, [])
			};
		}
	};
}

module.exports = guardian;