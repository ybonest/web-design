const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const os = require('os'); // GET SYSTEM INFO
const path = require('path');

/**
 * ts-import-plugin 实现按需加载，而不是将整个包全部加载进去
 * transform such code:
 * import { Alert, Card as C } from 'antd'
 * into:

 * import Alert from 'antd/lib/alert'* import 'antd/lib/alert/style/index.less'
 * import { default as C } from 'antd/lib/card'
 * import 'antd/lib/card/style/index.less'
 */
const tsImportPluginFactory = require('ts-import-plugin')

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

exports.rulesLess = () => ({
  test: /\.less$/,
  // exclude: /node_modules|antd\.less/,
  use: 'happypack/loader?id=less'
})

exports.rulesJS = () => ({
  // enforce: "pre",
  test: /\.js|ts|tsx|jsx$/,
  // test: /\.js|jsx$/,
  exclude: /(node_modules|bower_components)/,
  // include: [path.join(__dirname, '../src')],
  use: 'happypack/loader?id=js'
})

exports.rulesTsx = () => ({
  test: /\.ts(x)?$/,
  exclude: /node_modules/,
  loaders: [
    {
      loader: 'babel-loader?cacheDirectory',
    },
    {
    loader: 'awesome-typescript-loader',
    options: {
      getCustomTransformers: () => ({
        before: [tsImportPluginFactory({
          libraryName: 'antd',
          libraryDirectory: 'lib',
          style: true // TODO 引入css无效 使用此插件
        })]
      }),
    }
  }]
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
    loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
  }, {
    loader: "less-loader", // 将 Sass 编译成 CSS
    options: {
      javascriptEnabled: true  // 解决 问题 https://github.com/ant-design/ant-design/issues/7927
    }
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
  loaders: [{
    loader: 'css-loader',
    options: {
      importLoaders: 1
    }
  }]
}

exports.image = {
  test: /\.(jpe?g|png|gif|svg)(\?.+)?$/,
  loaders: [{
      loader: 'file-loader?cacheDirectory=true',
      options: {
        name: '[name].[ext]',
        outputPath: 'assets/'
      }
    },
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true
        },
        gifsicle: {
          interlaced: true
        },
        optipng: {
          optimizationLevel: 7
        }
      }
    }
  ]
}

exports.font = {
  test: /\.(eot|ttf|woff|woff2)(\?.+)?$/,
  loaders: [{
    loader: 'file-loader',
    options: {
      name: 'assets/fonts/[hash].[ext]'
    }
  }]
}

if (devMode) {
  less.loaders.unshift({
    loader: "style-loader"
  });
  css.loaders.unshift({
    loader: "style-loader"
  });
  scss.loaders.unshift({
    loader: "style-loader"
  });
}

exports.happyPackMap = () => ([
  new HappyPack({
    id: 'js',
    threadPool: happyThreadPool,
    loaders: [{
      loader: 'babel-loader?cacheDirectory',
    }]
  }),
  new HappyPack(scss),
  new HappyPack(css),
  new HappyPack(less)
])