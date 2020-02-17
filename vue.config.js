const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  publicPath: './',
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        { from: './src/assets', to: 'assets' },
      ]),
    ],
  },
  productionSourceMap: false,
};
