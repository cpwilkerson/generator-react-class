const webpack = require('webpack'); // eslint-disable-line no-unused-vars

const browserConfig = {
  entry: './src/client/index.js',
  output: {
    path: __dirname,
    filename: './dist/client/js/app-bundle.js'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {presets: ['react']}
      },
      {
        test: /\.scss$/,
        use: [{
          // creates style nodes from JS strings
          loader: 'style-loader'
        }, {
          // translates CSS into CommonJS
          loader: 'css-loader'
        }, {
          // compiles Sass to CSS
          loader: 'sass-loader'
        }]
      }
    ]
  }
};

const serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  output: {
    path: __dirname,
    filename: './dist/server/server.js',
    libraryTarget: 'commonjs2'
  },
  devtool: 'cheap-module-source-map',
  stats: {warnings: false},
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'file-loader',
        options: {
          name: 'public/media/[name].[ext]',
          publicPath: (url) => url.replace(/public/, ''),
          emit: false
        }
      },
      {
        test: [/\.scss$/, /\.css$/],
        use: [
          {loader: 'css-loader/locals'},
          {loader: 'sass-loader'}
        ]
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {presets: ['react']}
      }
    ]
  }
};

module.exports = [browserConfig, serverConfig];