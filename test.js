/* global console */
(function () {
	'use strict';

	var prettify = require('prettify-error');
	var guardian = require('./guardian');

	var guard = guardian().duty(function (result) {
		console.error(prettify(new Error("Failed!!!!!"), 2));
	});

	var resultOfSinglePassingAssert = guardian().assure(true).report();

	guard.assure(resultOfSinglePassingAssert.pass === 1);
	guard.assure(resultOfSinglePassingAssert.fail === 0);

	var resultOfSingleFailingAssert = guardian().assure(false).report();
	guard.assure(resultOfSingleFailingAssert.pass === 0);
	guard.assure(resultOfSingleFailingAssert.fail === 1);

	var r = guard.report();
	console.log('Results: ', r.pass, 'passed', r.fail, 'failed');
}());