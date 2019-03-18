const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    vendors: ["react", "react-dom"]
  },
  output: {
    path: path.resolve(__dirname, "../dll"),
    filename: "[name].dll.js",
    library: '[name]' // 存放相关的dll文件的全局变量名称, 此处与entry中的vendors对应
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]", // 必须与output.library保持一致
      path: path.resolve(__dirname, "../dll/[name].manifest.json")
    })
  ]
};
