var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

function deploy() {
  return gulp.src('./_game/**/*')
    .pipe(ghPages());
}

module.exports = deploy;
