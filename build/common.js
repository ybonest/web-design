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

exports.rulesLess = () =>({
  test: /\.less$/,
  use: 'happypack/loader?id=less'
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
    filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
    chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
  })
)

exports.htmlWebpack = () => (
  new HtmlWebpackPlugin({
    hash: true,
    template: './index.html'
  })
)

const less = {
  id: 'less',
  threadPool: happyThreadPool,
  loaders: [{
    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
  }, {
    loader: "less-loader" // 将 Sass 编译成 CSS
  }]
}

const scss = {
  id: 'scss',
  threadPool: happyThreadPool,
  loaders: [{
    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
  }, {
    loader: "sass-loader" // 将 Sass 编译成 CSS
  }]
}

const css = {
  id: 'css',
  threadPool: happyThreadPool,
  loaders: ['css-loader']
}

if (devMode) {
  scss.loaders.unshift({loader: "style-loader"});
  css.loaders.unshift({loader: "style-loader"});
  scss.loaders.unshift({loader: "style-loader"});
}

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
  new HappyPack(scss),
  new HappyPack(css),
  new HappyPack(less)
])