
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

/* eslint-disable no-underscore-dangle */
module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts);

    this.props = {
      clientOnly: 'N',
      completeApp: 'Y'
    };

    this.option('className', {
      desc: 'Name of the react class',
      alias: 'c',
      type: String,
      default: ''
    });

    this.option('fileName', {
      desc: 'Name of the file for the React class',
      alias: 'f',
      type: String,
      default: ''
    });
  }

  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the superior ' +
                   `${chalk.red('React Class and/or App')} generator!`
    ));

    const prompts = [{
      type: 'input',
      name: 'className',
      message: 'What is the name of your React Class?',
      default: this.options.className
    },
    {
      type: 'input',
      name: 'fileName',
      message: 'What is the file name of your React Class?',
      default: this.options.fileName
    },
    {
      type: 'input',
      name: 'description',
      message: 'How about a short description for the component?',
      default: (answers) =>
                          `My best ${answers.className} reactjs component ever!`
    },
    {
      type: 'input',
      name: 'app',
      message: 'Need an app wrapped around your new component? (Y)es/(N)o',
      default: 'N'
    },
    {
      type: 'input',
      name: 'clientOnly',
      message: 'Is this a client only app? (Y)es/(N)o',
      default: 'N',
      when: (answers) => answers.app.search(/y/i) > -1
    },
    {
      type: 'input',
      name: 'completeApp',
      message: 'Does this app need a package.json,' +
               'and other config files? (Y)es/(N)o',
      default: 'Y',
      when: (answers) => answers.app.search(/y/i) > -1
    },
    {
      type: 'input',
      name: 'author',
      message: 'Who is the author of this app?',
      default: 'webappsteam@esri.com',
      when: (answers) => answers.app.search(/y/i) > -1
    }
  ];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;

      this.props = props;
    });
  }

  _writeReactClass () {
    const fs = this.fs,
           props = this.props,
           appPath = this.props.app.search(/y/i) > -1 ? 'src/client/' : '';
    const rcTemplate = fs.read(this.templatePath('react-class.js.template'));
    const sscsPlate = fs.read(this.templatePath('react-class.scss.template'));
    const jestPlate = fs.read(this.templatePath('react-class.test.template'));

    const rcClassFile = rcTemplate.
                           replace(/\{\{class-name\}\}/g, props.className).
                           replace(/\{\{file-name\}\}/g, props.fileName).
                           replace(/\{\{description\}\}/g, props.description);

    const rcSassFile = sscsPlate.
                           replace(/\{\{class-name\}\}/g, props.className).
                           replace(/\{\{file-name\}\}/g, props.fileName).
                           replace(/\{\{description\}\}/g, props.description);

    const rcJestFile = jestPlate.
                           replace(/\{\{class-name\}\}/g, props.className).
                           replace(/\{\{file-name\}\}/g, props.fileName).
                           replace(/\{\{description\}\}/g, props.description);

    fs.write(this.destinationPath(`${appPath}${props.fileName}.js`),
             rcClassFile);
    fs.write(this.destinationPath(`${appPath}${props.fileName}.scss`),
             rcSassFile);
    fs.write(this.destinationPath(`${appPath}${props.fileName}.test.js`),
             rcJestFile);

  }

  _writeReactApp () {
    const fs = this.fs,
          props = this.props,
          pkgJsonPlate = fs.read(this.templatePath('package.json.template')),
          readmePlate = fs.read(this.templatePath('readme.md.template')),
          appPlate = fs.read(this.templatePath('app.js.template'));

    const pkgJson = pkgJsonPlate.replace(/\{\{file-name\}\}/g, props.fileName).
                                 replace(/\{\{class-name\}\}/g, props.className).
                                 replace(/\{\{author\}\}/g, props.author);
    const readme = readmePlate.replace(/\{\{class-name\}\}/g, props.className);
    const app = appPlate.replace(/\{\{class-name\}\}/g, props.className).
                         replace(/\{\{file-name\}\}/g, props.fileName);

    if (props.completeApp.search(/y/i) > -1) {
      fs.write(this.destinationPath('package.json'), pkgJson);
      fs.write(this.destinationPath('README.md'), readme);
    }
    fs.write(this.destinationPath('src/client/app.js'), app);
  }

  _copyFiles () {
    const fs = this.fs;

    if (this.props.clientOnly.search(/y/i) > -1) {
      fs.copy(this.templatePath('copies/src/client/*'),
      this.destinationPath('src/client'));
      fs.copy(this.templatePath('copies/src/store/**/*'),
      this.destinationPath('src/store'));
    } else {
      fs.copy(this.templatePath('copies/vscode/launch.json'),
                                this.destinationPath('./.vscode/launch.json'));
      fs.copy(this.templatePath('copies/.*'), this.destinationPath('./'));
      fs.copy(this.templatePath('copies/*'), this.destinationPath('./'));
      fs.copy(this.templatePath('copies/src/**/*'),
                                this.destinationPath('src/'));
      fs.copy(this.templatePath('copies/gulp-tasks/*'),
                                this.destinationPath('./gulp-tasks/'));
    }
  }

  writing () {
    if (this.props.app.search(/y/i) > -1) {
      this.log(chalk.magenta('Create a react/redux/ssr app here for ' +
                             `${chalk.cyan.underline(this.props.author)}.`));
      this._writeReactApp();
      this._copyFiles();
    }

    this._writeReactClass();
  }

  install () {
    // this.installDependencies(); // runs npm and bower
    if (this.props.clientOnly && this.props.clientOnly.search(/y/i) > -1) {
      return;
    }

    if (this.props.app.search(/y/i) > -1) {
      this.npmInstall(['@babel/polyfill',
                       'body-parser',
                       'chalk',
                       'debug',
                       'express',
                       'isomorphic-fetch',
                       'prop-types',
                       'react',
                       'react-dom',
                       'react-redux',
                       'react-router-dom',
                       'redux',
                       'redux-devtools-extension',
                       'redux-thunk',
                       'serialize-javascript'], {'save': true});

      this.npmInstall(['@babel/core',
                       '@babel/cli',
                       'babel-loader',
                       'babel-plugin-react-css-modules',
                       '@babel/preset-env',
                       '@babel/preset-react',
                       '@babel/register',
                       'enzyme',
                       'eslint',
                       'eslint-plugin-jest',
                       'eslint-plugin-react',
                       'extract-text-webpack-plugin',
                       'file-loader',
                       'gulp',
                       'gulp-eslint',
                       'gulp-logger',
                       'gulp-plumber',
                       'gulp-run',
                       'gulp-sass',
                       'gulp-sass-glob',
                       'gulp-sourcemaps',
                       'gulp-watch',
                       'jest',
                       'jest-fetch-mock',
                       'node-sass',
                       'require-dir',
                       'enzyme-adapter-react-16',
                       'supertest',
                       'webpack',
                       'webpack-cli'], {'save-dev': true});
    }
  }
};

/* eslint-enable no-underscore-dangle */