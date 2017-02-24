const webpack = require('webpack');
const helpers = require('./helpers');
const root = helpers.root;

console.log(helpers.root('../src'));

module.exports = {
  entry: {
    'app': './src/main.ts'
  },

  // output: {
  //   path: root('dist'),
  //   filename: '[name].js'
  // },

  resolve: {
    extensions: ['.ts', '.js']
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular-router-loader']
      },
      {
        test: /\.html$/,
        include: root('src'),
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        include: root('src'),
        loader: 'null-loader'
      },
      {
        test: /\.scss$/,
        include: root('src'),
        loader: 'null-loader'
      }
    ]
  },
  
  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('../src'), // location of your src
      {} // a map of your routes
    )
  ]
};
