
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-react-class:app', () => {
  beforeAll(() => helpers.run(path.join(__dirname, '../generators/app')).
  withPrompts({
    className: 'Jester',
    fileName: 'jester'
  }));

  it('creates files', () => {
    assert.file([
      'jester.js',
      'jester.test.js',
      'jester.scss'
    ]);
  });
});