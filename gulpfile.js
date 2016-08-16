'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var debug = require('gulp-debug');

/**
 * default task
 */
gulp.task('default', ['lint', 'test']);
gulp.task('lint', ['lint']);

/**
 * lint task
 */
gulp.task('lint', function() {
  return gulp.src([
    '**/*.js',
    '!node_modules/**',
    '!views/**',
  ])
    .pipe(debug({title: 'linting'}))
    .pipe(eslint())
    .pipe(eslint.failOnError());
});

/**
 * test task depends on task lint
 */
gulp.task('test', function() {
  return gulp.src('test/**/*.js')
    .pipe(debug({title: 'testing'}))
    .pipe(mocha())
    .once('end', function() { process.exit(); });
});
