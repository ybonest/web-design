// const { entry, output,  } = require('./common');
/**
 * 配制笔记
 * const ExtractTextPlugin = require("extract-text-webpack-plugin");  
 * webpack4中该插件不能使用，否则报错
 * DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
 * 用mini-css-extract-plugin代替
 */
const webpack = require('webpack');
const path = require('path');
const AddHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const { CheckerPlugin } = require('awesome-typescript-loader');
const { rulesCSS, rulesScss, rulesJS, rulesTsx, htmlWebpack, miniCssPlugin, happyPackMap } = require('./common');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    './src/app.tsx',
    'webpack-dev-server/client/index.js?http://localhost:8080/'
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]_[hash:8].bundle.js'
  },
  module: {
    rules: [
      rulesCSS(), rulesScss(), rulesJS(), rulesTsx()
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css", ".scss", ".json"]
  },
  plugins: [
    miniCssPlugin(),
    htmlWebpack(),
    new CheckerPlugin(),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "../dll/manifest.json")
    }),
    new AddHtmlWebpackPlugin({
      filepath: require.resolve(__dirname, "../dll/manifest.json")
    })
  ].concat(happyPackMap())
}