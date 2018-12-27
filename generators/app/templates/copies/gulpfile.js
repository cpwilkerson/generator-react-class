const {buildScss} = require('./gulp-tasks/scss-compile');
const {copyIndex, watchIndex} = require('./gulp-tasks/file-tasks');

/**
 * Gulp build command
 * @param {func} done error-first callback
 * @return {void}
 */
function build (done) {
  buildScss('./src/', './dist/client/css/');
  copyIndex();
  done();
}

/**
 * Gulp watch command
 * @param {func} done error-first callback
 * @return {void}
 */
function watch (done) {
  watchIndex();
  done();
}

/**
 * Default gulp task
 * @param {func} done error-first callback
 * @return {void}
 */
function defaultTask (done) {
  build(done);
}

exports.watch = watch;
exports.build = build;
exports.default = defaultTask;