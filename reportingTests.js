module.exports = function (guardian) {
	'use strict';

	var guard = guardian(),
		emptyReport = guard.report();

	guard.assert(true).assert(true).assert(false);
	var report = guard.report();

	return {
		'no tests, 0 pass': emptyReport.pass === 0,
		'no tests, 0 fail': emptyReport.fail === 0,
		'report has 2 passes': report.pass === 2,
		'report has 1 fail': report.fail === 1
	};
};