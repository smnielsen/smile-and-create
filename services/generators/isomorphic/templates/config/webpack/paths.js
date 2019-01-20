import path from 'path';

export default {
  root: path.resolve(__dirname, '../', '../'),
  outputPath: path.resolve(__dirname, '../', '../', 'build'),
  entryPath: path.resolve(__dirname, '../', '../', 'client/index.js'),
  templatePath: path.resolve(__dirname, '../', '../', 'client/index.html'),
  imagesFolder: 'images',
  fontsFolder: 'fonts',
  cssFolder: 'css',
  jsFolder: 'js'
};