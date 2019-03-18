const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    venders: ["react", "react-dom"]
  },
  output: {
    path: path.resolve(__dirname, "../dll"),
    filename: "[name]_[hash:8].bundle.js"
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]_[hash:8].bundle.js",
      path: path.resolve(__dirname, "../dll/manifest.json")
    })
  ]
};
