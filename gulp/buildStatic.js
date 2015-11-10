var gulp = require('gulp');

function buildStatic() {
  return gulp.src(['static/**/*.*'])
    .pipe(gulp.dest('_game'));
}

module.exports = buildStatic;
