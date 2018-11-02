const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const logger = require('gulp-logger');

const pkg = require('../package.json');

/**
 * Utility gulp function that finds all sass files in a project and compiles
 * them to css files
 * @param {string} sourceFolder sass source folder
 * @param {string} destFolder css destination folder
 * @return {void}
 */
function compileScss (sourceFolder, destFolder) {
  gulp.src(`${sourceFolder}/app.scss`, {base: sourceFolder}).
    pipe(plumber()).
    pipe(logger({
      before: `Starting compileScss - ${new Date()}`,
      after: `compileScss complete - ${new Date()}`,
      showChange: false
    })).
    pipe(sourcemaps.init()).
    pipe(sourcemaps.identityMap()).
    pipe(sassGlob()).
    pipe(sass({
      outputStyle: 'compressed'
    })).
    pipe(sourcemaps.write('./')).
    pipe(gulp.dest(destFolder)).
    on('error', (err) => {
      console.log(err);
      this.emit('end');
    });
}

gulp.task('build-scss', () => {
  compileScss('./src/', './dist/client/css/');
});