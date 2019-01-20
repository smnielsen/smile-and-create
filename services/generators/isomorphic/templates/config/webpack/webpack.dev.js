import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import path from 'path';

import paths from './paths';

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: paths.outputPath,
    chunkFilename: '[name].js',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: paths.outputPath,
    compress: true,
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new AssetsPlugin({
      filename: 'assets.json',
      includeManifest: 'manifest',
      path: path.resolve(__dirname, '../../', 'server')
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: `${paths.cssFolder}/[name].css`,
      chunkFilename: `${paths.cssFolder}/[id].css`
    })
  ]
};