/* global console */
(function () {
	'use strict';

	//var prettify = require('./prettify-error');
	var guardian = require('./guardian');

	var guard = guardian();
	var assure = guard.assure.bind(guard);

	guard.duty(function (data) {
		var message = "assurance failure";
		if (data) {
			message = data.map(function (i) {
				return typeof i === 'object' ? JSON.stringify(i) : i;
			}).join(' ');
		}
		// console.error(prettify(new Error("Security Alert: " + message), 2));
	});

	var result = guardian()
		.assure(false)
		.assure(false)
		.assure(true)
		.assure(true)
		.assure(true)
		.report();

	assure(result.pass === 3, 'Correct number of passes in result:', result);
	assure(result.fail === 2, 'Correct number of failures in result:', result);

	module.exports = guard.report();
}());