var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var root = helpers.root;

module.exports = webpackMerge(commonConfig, {
  devtool: null,

  output: {
    path: root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js'
  },

  htmlLoader: {
    minimize: false
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   mangle: {
    //     keep_fnames: true
    //   }
    // }),
    new ExtractTextPlugin('[name].[hash].css')
  ]
});
