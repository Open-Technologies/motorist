var gulp = require('gulp');

function buildStatic() {
  return gulp.src(['static/**/*.*'])
    .pipe(gulp.dest('lib'));
}

module.exports = buildStatic;
