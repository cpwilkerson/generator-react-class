# generator-react-class [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Creates a react class js file, a test js file, and a sass file.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-react-class using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-react-class
```

Then generate your new project:

```bash
yo react-class
```

## Running your project

You will need to install gulpjs, and nodemon globally.
```bash
npm install -g gulp
npm install -g nodemon
```

Running in development mode
```bash
npm run dev
```

# NODEMON Known Issue

In the generated node app, there is a problem in the ```npm run dev``` script
that currently requires you to run ```npm run dev``` twice.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Christian Wilkerson]()


[npm-image]: https://badge.fury.io/js/generator-react-class.svg
[npm-url]: https://npmjs.org/package/generator-react-class
[travis-image]: https://travis-ci.org/cpwilkerson/generator-react-class.svg?branch=master
[travis-url]: https://travis-ci.org/cpwilkerson/generator-react-class
[daviddm-image]: https://david-dm.org/cpwilkerson/generator-react-class.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/cpwilkerson/generator-react-class
[coveralls-image]: https://coveralls.io/repos/cpwilkerson/generator-react-class/badge.svg
[coveralls-url]: https://coveralls.io/r/cpwilkerson/generator-react-class
