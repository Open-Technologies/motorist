var gulp = require('gulp');
var detectErrors = require('./gulp/detectErrors');
var clean = require('./gulp/clean');
var buildStatic = require('./gulp/buildStatic');
var bundle = require('./gulp/bundle');
var deploy = require('./gulp/deploy');

gulp.task('default', ['bundle']);
gulp.task('deploy', ['default'], deploy);

gulp.task('bundle', ['buildStatic'], bundle);
gulp.task('buildStatic', ['detectErrors', 'clean'], buildStatic);
gulp.task('detectErrors', detectErrors);
gulp.task('clean', clean);
