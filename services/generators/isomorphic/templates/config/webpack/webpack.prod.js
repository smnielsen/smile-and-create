import CleanWebpackPlugin from 'clean-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import safePostCssParser from 'postcss-safe-parser';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import path from 'path';
import paths from './paths';

const shouldUseSourceMap = true;

module.exports = {
  mode: 'production',
  output: {
    filename: `${paths.jsFolder}/[name].[hash].js`,
    path: paths.outputPath,
    chunkFilename: `${paths.jsFolder}/[name].[chunkhash].js`,
    publicPath: '/'
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 450000,
    maxEntrypointSize: 8500000,
    assetFilter: assetFilename => {
      return (
        assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
      );
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimize: true,
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: shouldUseSourceMap
            ? {
              // `inline: false` forces the sourcemap to be output into a
              // separate file
              inline: false,
              // `annotation: true` appends the sourceMappingURL to the end of
              // the css file, helping the browser find the sourcemap
              annotation: true,
            }
            : false,
        }
      })
    ]
  },
  plugins: [
    new AssetsPlugin({
      filename: 'assets.json',
      includeManifest: 'manifest',
      path: path.resolve(__dirname, '../../', 'build/server')
    }),
    new CleanWebpackPlugin([paths.outputPath.split('/').pop()], {
      root: paths.root
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: `${paths.cssFolder}/[name].[hash].css`,
      chunkFilename: `${paths.cssFolder}/[id].[hash].css`
    })
  ],
  devtool: 'inline-source-map',
};