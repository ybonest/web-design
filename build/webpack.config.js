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
const AddHtmlWebpackPlugin = require('add-asset-html-webpack-plugin'); // 将js插入html模板中

const {
  CheckerPlugin
} = require('awesome-typescript-loader');
const {
  rulesCSS,
  rulesScss,
  rulesLess,
  rulesJS,
  rulesTsx,
  htmlWebpack,
  miniCssPlugin,
  happyPackMap
} = require('./common');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    './src/app.tsx',
    'webpack-dev-server/client/index.js?http://localhost:8080/'
  ],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]_[hash:8].bundle.js'
  },
  module: {
    rules: [
      rulesCSS(), rulesScss(), rulesJS(), rulesTsx(), rulesLess()
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css", ".scss", ".less", ".json"]
  },
  plugins: [
    miniCssPlugin(),
    htmlWebpack(),
    new AddHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, "../dll/*.dll.js")
    }),
    new CheckerPlugin(),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "../dll/vendors.manifest.json")
    })
  ].concat(happyPackMap())
}