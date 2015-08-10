var gulp = require('gulp');
var detectErrors = require('./gulp/detectErrors');
var cleanLib = require('./gulp/cleanLib');
var buildStatic = require('./gulp/buildStatic');
var createBundles = require('./gulp/createBundles');

gulp.task('default', ['buildStatic', 'createBundles']);

gulp.task('buildStatic', ['cleanLib'], buildStatic);
gulp.task('createBundles', ['detectErrors'], createBundles);
gulp.task('detectErrors', ['cleanLib'], detectErrors);
gulp.task('cleanLib', cleanLib);
