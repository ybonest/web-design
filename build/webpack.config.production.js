// const { entry, output,  } = require('./common');
/**
 * 配制笔记
 * const ExtractTextPlugin = require("extract-text-webpack-plugin");
 * webpack4中该插件不能使用，否则报错
 * DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
 * 用mini-css-extract-plugin代替
 */

/**
 * 抽离css
 * mini-css-extract-plugin抽离css文件
 */
const path = require("path");
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const {
  CheckerPlugin
} = require("awesome-typescript-loader");
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const {
  rulesCSS,
  rulesScss,
  rulesJS,
  rulesTsx,
  htmlWebpack,
  rulesLess,
  happyPackMap,
  image,
  font
} = require("./common");

module.exports = {
  mode: 'production',
  devtool: 'nosources-source-map',
  entry: [
    './src/app.tsx'
  ],
  output: {
    path: path.resolve(__dirname, "../dist"),
    chunkFilename: 'js/[name].bundle.js', // 此配置针对js中的import(/* webpackChunkName: "lodash" */ 'lodash')引入，返回Promise
    filename: "js/[name]_[hash:8].bundle.js"
  },
  module: {
    rules: [
      rulesJS(), 
      // rulesTsx(), 
      {
        test: /\.less$/,
        loaders: [MiniCssExtractPlugin.loader, rulesLess().use] // 使用mini-css-extract-plugin便不可以使用style-loader
      }, {
        test: /\.scss$/,
        loaders: [MiniCssExtractPlugin.loader, rulesScss().use]
      }, {
        test: /\.css$/,
        loaders: [MiniCssExtractPlugin.loader, rulesCSS().use]
      }, 
      image,
      font
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css", ".scss", ".less", ".json", ".jpg"]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      // new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          minChunks: 2
        },
        styles: { // TODO 尚不知具体作用
          name: 'styles',
          test: /\.css$/,
          minChunks: 1,
          enforce: true
        },
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
    htmlWebpack(),
    new ServiceWorkerWebpackPlugin({
      // 自定义的 sw.js 文件所在路径
      // ServiceWorkerWebpackPlugin 会把文件列表注入到生成的 sw.js 中
      entry: path.join(__dirname, '../sw.js'),
    }),
    // new CheckerPlugin(),
    new webpack.HashedModuleIdsPlugin() // 通过optimization抽离出得第三方包每次编译都会重新生成hash名称，此插件可生成一致的hash名称
  ].concat(
    happyPackMap()
  )
};
