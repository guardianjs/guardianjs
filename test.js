var guardian = require('./guardian');
var basicTests = require('./basicTests');

basicTests(guardian);

console.log('pass:', new Date());