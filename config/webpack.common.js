const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');
const root = helpers.root;

module.exports = {
   resolve: {
    extensions: ['.ts', '.js']
  },

  entry: {
    'app': './src/main.ts'
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        include: root('src'),
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        include: root('src'),
        loader: 'url-loader?{limit: 20000, name: "assets/[name].[hash].[ext]"}'
      },
      {
        test: /\.scss$/,
        include: root('src'),
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: root('index.html')
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname
    )
  ]
};
