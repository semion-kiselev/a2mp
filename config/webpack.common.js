var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var root = helpers.root;

module.exports = {
   resolve: {
    root: root('src'),
    extensions: ['', '.ts', '.js']
  },

  entry: {
    'app': 'main.ts'
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        include: root('src'),
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        include: root('src'),
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        include: root('src'),
        loader: 'url?{limit: 20000, name: "assets/[name].[hash].[ext]"}'
      },
      {
        test: /\.scss$/,
        include: root('src'),
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: root('index.html')
    })
  ]
};
