/* global console */

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
				detail: h(test)
			});
		},
		report: function () {
			return {
				pass: result(true),
				fail: result(false),
				detail: tests.reduce(function (t, i) {
					console.log(t, i);
					return i.detail ? t.push(i.detail) && t : t;
				}, [])
			};
		}
	};
}


var guard = guardian();
guard.hook(function (result) {
	//return 
});
guard.assure(true);
guard.assure(false);
console.log(guard.report());