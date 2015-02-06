/* global */
'use strict';

var gulp = require('gulp'),
	jshint = require('gulp-jshint');

var paths = {
	scripts: ['./*.js', '!./gulpfile.js']
};

gulp.task('lint', function () {
	return gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('test', function () {
	var r = require('./test.js');
	console.log('Test results: ', r.pass, 'passed', r.fail, 'failed');
});

gulp.task('watch', function () {
	gulp.watch(paths.scripts, ['lint', 'test']);
});

gulp.task('default', ['lint', 'test', 'watch']);