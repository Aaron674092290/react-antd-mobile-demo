const getPort = require('get-port');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const baseWebpackConfig = require('./webpack.common.conf');
const { resolve, plugins } = require('./util');
function getIPAdress() {
  let interfaces = require('os').networkInterfaces();

  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];

      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
}

module.exports = async () => {
  const hostIP = getIPAdress();
  const hostPort = await getPort();

  return Object.assign({}, baseWebpackConfig, {
    output: {
      clean: true,
      filename: '[name].js',
      publicPath: `http://${hostIP}:${hostPort}/`,
    },
    plugins: [
      // 生成 html 文件
      ...plugins,
      new HtmlWebpackHarddiskPlugin({
        outputPath: resolve('views'),
      }),
    ],
    devServer: {
      client: {
        overlay: { warnings: false, errors: true },
        logging: 'warn',
      },
      hot: true,
      compress: true,
      host: hostIP,
      port: hostPort,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization',
      },
      allowedHosts: 'all',
      devMiddleware: {
        // 为了减少输出量，可以只显示错误
        stats: 'errors-only',
      },
    },
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
  });
};
