global.beforeEach = function (func) {
	global.beforeEach.addMatchers = function (m) {
		for (var key in m) {
			beforeEach.matchers[key] = m[key];
		}
	};
	func.call(global.beforeEach);
};

global.beforeEach.matchers = {};

require('jasmine-matchers');

module.exports = function (actual) {
	'use strict';
	return Object.create(global.beforeEach.matchers, {
		actual: {
			get: function () {
				return actual;
			}
		}
	});
};