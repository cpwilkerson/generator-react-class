const gulp = require('gulp');

require('require-dir')('./gulp-tasks');

gulp.task('build', ["build-scss"], () => { });
