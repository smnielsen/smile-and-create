import webpack from 'webpack';

import paths from './paths';
import rules from './rules';

module.exports = {
  entry: [
    paths.entryPath
  ],
  module: {
    rules
  },
  resolve: {
    modules: ['client', 'node_modules'],
    extensions: ['*', '.js', '.scss', '.css']
  },
  plugins: [
    new webpack.ProgressPlugin()
  ]
};