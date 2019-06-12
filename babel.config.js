module.exports = function (api) {
  api.cache(true);

  return {
    "presets": ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"],
    // "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": [
      "@babel/plugin-transform-runtime",
      "@babel/plugin-syntax-dynamic-import",
      '@babel/plugin-proposal-class-properties',
      ["import", {
        "libraryName": "antd",
        "libraryDirectory": "lib",
        // "style": (name, file) => {
        //   // if (name)
        //   console.log(name, "********")
        //   // return 
        // }
        style: true
      }]
    ]
  };
}