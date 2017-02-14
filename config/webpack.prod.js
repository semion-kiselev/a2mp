const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const root = helpers.root;

module.exports = webpackMerge(commonConfig, {
  devtool: false,

  entry: {
    'app': './src/main.aot.ts'
  },

  output: {
    path: root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular-router-loader?aot=true']
      }
    ]
  },
  
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        keep_fnames: true
      }
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
});
