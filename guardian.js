'use strict';

function reportReduce(report, test) {
  return (test.pass ?
    report.pass += 1 :
    report.fail += 1) && report;
}

function failures(tests) {
  return tests.filter(function (test) {
    return !test.pass;
  }).map(function (test) {
    var r = {};
    for (var k in test) {
      if (typeof test[k] !== 'function')
        r[k] = test[k];
    }
    return r;
  });
}

function report(tests) {
  return tests.reduce(reportReduce, {
    pass: 0,
    fail: 0
  });
}

function guardian(overrides) {
  var o = overrides || {},
    d = guardian.defaults(o.tests || []),
    assert = o.assert || d.assert,
    complete = o.complete || d.complete;

  var guard = Object.freeze(Object.create({
    assert: function (pass) {
      var result = assert.bind(this)(pass);
      complete.bind(this)(result);
      return result;
    },
    failures: failures.bind(null, d.tests),
    report: report.bind(null, d.tests)
  }));

  return guard;
}

guardian.defaults = function (tests) {
  return {
    tests: tests,
    complete: function (result) {
      tests.push(result);
    },
    assert: function (pass) {
      return Object.freeze(Object.create(this, {
        pass: {
          value: pass,
          enumerable: true
        }
      }));
    }
  };
};

module.exports = guardian;
