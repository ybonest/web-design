// const { entry, output,  } = require('./common');
/**
 * 配制笔记
 * const ExtractTextPlugin = require("extract-text-webpack-plugin");
 * webpack4中该插件不能使用，否则报错
 * DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
 * 用mini-css-extract-plugin代替
 */
const path = require("path");

const { CheckerPlugin } = require("awesome-typescript-loader");
const {
  rulesCSS,
  rulesScss,
  rulesJS,
  rulesTsx,
  htmlWebpack,
  miniCssPlugin,
  happyPackMap
} = require("./common");

module.exports = {
  mode: "production",
  devtool: "inline-source-map",
  entry: {
    // vender: ["react", "react-dom"],
    app: "./src/app.tsx"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name]_[hash:8].bundle.js"
  },
  module: {
    rules: [rulesCSS(), rulesScss(), rulesJS(), rulesTsx()]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css", ".scss", ".json"]
  },
  plugins: [miniCssPlugin(), htmlWebpack(), new CheckerPlugin()].concat(
    happyPackMap()
  )
};
