#!/usr/bin/env node

'use strict';

(function () {
	require('guardian-runner')('test.js', ['*.js', '**/*.js']);
}());