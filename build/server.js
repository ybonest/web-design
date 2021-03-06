const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

/**
 * webpack-dev-server配置和在config文件的devServer属性下，但由于node api下，不webpack不识别config中的devServer
 * 所以由此文件处理devServer配制
 */

const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost',
  compress: true
};
webpackDevServer.addDevServerEntrypoints(webpackConfig, options); // 热加载需使用此处

const compiler = webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, options);

const server = new webpackDevServer(compiler, devServerOptions);

server.listen(8080, '127.0.0.1', () => {
  console.log('server on http://localhost:8080');
})