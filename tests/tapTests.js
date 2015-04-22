module.exports = function (guardian) {
  var result = [];

  function log(msg) {
    result.push(msg);
  }

  var tap = require('../guardian-tap')(log),
    test = tap.test('what a test', false),
    test2 = tap.test('what again', true);
  tap.end();

  return {
    'test has a name': test.name === 'what a test',
    'test has failed': test.pass === false,
    'tap start works': result[0] === 'TAP version 13',
    'tap output fail': result[1] === "not ok 1 - what a test",
    'tap output pass': result[2] === "ok 2 - what again",
    'tap output ends': result[3] === '1..2',
  };
};