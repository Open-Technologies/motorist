var gulp = require('gulp');
var detectErrors = require('./gulp/detectErrors');
var clean = require('./gulp/clean');
var buildStatic = require('./gulp/buildStatic');
var createBundles = require('./gulp/createBundles');
var deploy = require('./gulp/deploy');

gulp.task('default', ['buildStatic', 'createBundles']);
gulp.task('deploy', ['default'], deploy);

gulp.task('buildStatic', ['clean'], buildStatic);
gulp.task('createBundles', ['detectErrors'], createBundles);
gulp.task('detectErrors', ['clean'], detectErrors);
gulp.task('clean', clean);
