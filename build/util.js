const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const plugins = [
  new HtmlWebpackPlugin({
    title: 'test',
    filename: 'entry.handlebars',
    template: path.resolve(__dirname, '../entry/app.handlebars'),
    chunks: ['manifest', 'vendor', 'commons', 'entry'],
    inject: true,
    minify: false,
    alwaysWriteToDisk: true,
  }),
];

const loaders = [
  {
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'ts-loader',
        options: {
          configFile: resolve('tsconfig.json'),
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  {
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ],
  },
  {
    test: /\.(svg|jpg|png|gif)$/,
    use: [
      'url-loader?esModule=false&limit=100000&name=img/[name].[hash:8].[ext]',
    ],
  },
  {
    test: /\.(eot|ttf|woff|woff2)$/,
    use: ['file-loader?name=font/[name].[hash:8].[ext]'],
  },
];

module.exports = {
  resolve,
  loaders,
  plugins,
};
