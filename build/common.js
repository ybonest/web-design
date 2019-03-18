const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const os = require('os'); // GET SYSTEM INFO

const devMode = process.env.NODE_ENV !== 'production'

// 设置happypack所调用的进程数量
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});

// module rules
exports.rulesCSS = () => ({
  test: /\.css$/,
  use: 'happypack/loader?id=css'
})

exports.rulesScss = () => ({
  test: /\.scss$/,
  use: 'happypack/loader?id=scss'
})

exports.rulesJS = () => ({
  enforce: "pre",
  test: /\.js(x)$/,
  exclude: /(node_modules|bower_components)/,
  use: 'happypack/loader?id=js'
})

exports.rulesTsx = () => ({
  test: /\.ts(x)?$/,
  use: ['awesome-typescript-loader']
})

// plugins
exports.miniCssPlugin = () => (
  new MiniCssExtractPlugin({
    filename: devMode ? '[name].css' : '[name].[hash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
  })
)

exports.htmlWebpack = () => (
  new HtmlWebpackPlugin({
    hash: true,
    template: './index.html'
  })
)

exports.happyPackMap = () => ([
  new HappyPack({
    id: 'js',
    threadPool: happyThreadPool,
    loaders: [{
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }]
  }),
  new HappyPack({
    id: 'scss',
    threadPool: happyThreadPool,
    loaders: [{
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../'
      }
    }, 'css-loader']
  }),
  new HappyPack({
    id: 'css',
    threadPool: happyThreadPool,
    loaders: [{
      loader: "style-loader" // 将 JS 字符串生成为 style 节点
    }, {
      loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
    }, {
      loader: "sass-loader" // 将 Sass 编译成 CSS
    }]
  })
])