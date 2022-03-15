const path = require('path');
const { resolve, loaders } = require('./util');

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    entry: './src/page/entry.tsx',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.less', '.json'],
    alias: {
      src: resolve('src'),
      components: resolve('src/components'),
      common: resolve('src/common'),
    },
  },
  module: {
    rules: loaders,
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          priority: 0,
          maxSize: 244 * 1000,
        },
        defaultVendors: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
          maxSize: 244 * 1000,
        },
      },
    },
  },
};
