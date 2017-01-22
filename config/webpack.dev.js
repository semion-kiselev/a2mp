const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const root = helpers.root;

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        include: root('src'),
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
