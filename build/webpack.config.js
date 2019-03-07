const path = require('path');

// const { entry, output,  } = require('./common');

module.exports = {
  mode: 'development',
  entry: [
    '../src/app',
    'webpack-dev-server/client/index.js?http://localhost:8080/'
  ],                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[hash:8].bundle.js'
  },
  module: {
    
  }
}