// const { entry, output,  } = require('./common');
/**
 * 配制笔记
 * const ExtractTextPlugin = require("extract-text-webpack-plugin");  
 * webpack4中该插件不能使用，否则报错
 * DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
 * 用mini-css-extract-plugin代替
 * 
 * 开发生产环境配置（cross-env）
 * window平台不识别NODE_ENV命令，cross-env能跨平台地设置及使用环境变量
 */
const webpack = require('webpack');
const path = require('path');
const AddHtmlWebpackPlugin = require('add-asset-html-webpack-plugin'); // 将js插入html模板中
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const {
  rulesCSS,
  rulesScss,
  rulesLess,
  rulesJS,
  rulesTsx,
  htmlWebpack,
  miniCssPlugin,
  happyPackMap,
  image,
  font
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
      rulesCSS(),
      rulesScss(),
      rulesLess(),
      // rulesTsx(), 
      rulesJS(),
      image,
      font
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css", ".scss", ".less", ".json", ".jpg"]
  },
  plugins: [
    miniCssPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    htmlWebpack(),
    new AddHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, "../dll/*.dll.js")
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "../dll/vendors.manifest.json")
    }),
    new ServiceWorkerWebpackPlugin({
      // 自定义的 sw.js 文件所在路径
      // ServiceWorkerWebpackPlugin 会把文件列表注入到生成的 sw.js 中
      entry: path.join(__dirname, '../sw.js'),
    }),
  ].concat(happyPackMap())
}