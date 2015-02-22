var guardian = require('./guardian');
var basicTests = require('./basicTests');
//var reportingTests = require('./reportingTests');

var results = basicTests(guardian);


function getFailures(fails, test) {
	return results[test] ? fails : "Failure: " + fails + '\n' + test;
}

var failures = Object.keys(results).reduce(getFailures, '');
if (failures) throw new Error(failures);

console.log('Tests executed on: ', new Date());