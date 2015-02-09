module.exports = function (actual) {
	'use strict';
	var result = {
		actual: actual
	};
	var matchers = {};

	global.beforeEach = function (func) {
		result.addMatchers = function (m) {
			for (var key in m) {
				result[key] = m[key];
			}
		};
		func.call(result);
	};

	require('jasmine-matchers');
	return result;
};