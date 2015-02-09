/* global require */

(function () {
	'use strict';

	var spawn = require('child_process').fork;
	var gaze = require('gaze');
	var proc;

	var matches = ['./*.js', '!**/node_modules/**'];

	function spawnProc() {
		if (proc) {
			proc.kill('SIGHUP');
		}
		proc = spawn('test.js');
	}

	spawnProc();
	gaze(matches, function () {
		this.on('all', function (type, file) {
			spawnProc();
		});
	});
}());