var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

function createBundles() {
  return browserify({
      entries: './src/game.jsx',
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('game.js'))
    .pipe(gulp.dest('./lib/js'));
}

module.exports = createBundles;
