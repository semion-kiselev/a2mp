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
    'app': 'ts/index.ts'
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        include: root('src', 'ts'),
        loaders: ['awesome-typescript-loader']
      },
      {
        test: /\.html$/,
        include: root('src', 'ts', 'components'),
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        include: [
          root('src', 'images'), 
          root('src', 'fonts')
        ],
        loader: 'url?{limit: 20000, name: "assets/[name].[hash].[ext]"}'
      },
      {
        test: /\.scss$/,
        include: [
          root('src', 'sass'),
          root('src', 'ts', 'components')
        ],
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
