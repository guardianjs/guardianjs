/*jslint node: true */
'use strict';

function Tap(log) {
	var testCount = 0;
	
	log = (log || console.log);
	log('TAP version 13');
	
	return {
		test: function (name, pass) {
			testCount++;
			log((!pass ? 'not ok ' : 'ok ') + testCount + ' - ' + name);
			return Object.create(this, {
				name: {
					value: name
				},
				pass: {
					value: pass
				}
			});
		},
		end: function () {
			log('1..' + testCount);
		}
	};
}

module.exports = Tap;