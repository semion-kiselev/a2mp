const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ngToolsWebpack = require('@ngtools/webpack');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const root = helpers.root;

module.exports = webpackMerge(commonConfig, {
  devtool: false,

  output: {
    path: root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        include: root('src'),
        loader: '@ngtools/webpack'
      }
    ]
  },
  
  plugins: [
    new ngToolsWebpack.AotPlugin({
      tsConfigPath: './tsconfig.json',
      entryModule: './src/app.module#AppModule'
    }),
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
