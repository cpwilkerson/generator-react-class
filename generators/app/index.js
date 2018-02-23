
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts);

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
                   `${chalk.red('generator-react-class')} generator!`
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
      default: 'My best reactjs component ever!'
    }
  ];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing () {
    const fs = this.fs,
           props = this.props;
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

    fs.write(this.destinationPath(`${this.props.fileName}.js`), rcClassFile);
    fs.write(this.destinationPath(`${this.props.fileName}.scss`), rcSassFile);
    fs.write(this.destinationPath(`${this.props.fileName}.test.js`),
             rcJestFile);
  }

  // install () {
  //   // this.installDependencies(); // runs npm and bower
  //   this.npmInstall();
  // }
};