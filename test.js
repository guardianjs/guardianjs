#!/usr/bin/env node

'use strict';

var guardian = require('./guardian'),
  fs = require('fs'),
  cliColor = require('cli-color'),
  observatory = require('observatory').settings({
    prefix: cliColor.cyan('[guardian] ')
  });

function logFailures(failed) {
  return failed.map(function (test) {
    observatory.add(test).fail('Test failed');
  });
}

function failures(tests) {
  return Object.keys(tests)
    .filter(function (key) {
      return !tests[key];
    })
    .map(function (key) {
      return key;
    });
}

(function executeTests() {
  var start = new Date();
  fs.readdir('tests', function (err, files) {

    files.map(function (file) {
      var fileTask = observatory.add('Running: ' + file);
      var tests = require('./tests/' + file)(guardian);
      var testCount = Object.keys(tests).length;
      var fails = failures(tests);
      if (fails.length) {
        logFailures(fails);
        fileTask.fail(fails.length + ' of ' + testCount + ' failed');
      } else {
        fileTask.done(testCount + ' passed');
      }
    });

    var end = (new Date() - start) / 1000;

    observatory.add('Tests executed:').done(end + ' seconds');
  });
}());