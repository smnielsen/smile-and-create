import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const webpackEnv = process.env.NODE_ENV;
const isEnvDevelopment = webpackEnv === 'development';
const isEnvProduction = webpackEnv === 'production';

const getStyleLoaders = (cssOptions) => {
  return [
    isEnvDevelopment && require.resolve('style-loader'),
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader,
      options: { publicPath: '../../' },
    },
    {
      loader: 'css-loader',
      options: cssOptions,
    },
    {
      loader: 'postcss-loader',
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
        sourceMap: cssOptions.sourceMap,
      },
    }
  ].filter(Boolean);
};

export default [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader'
    }
  },
  {
    test: /\.(sa|sc|c)ss$/,
    use: getStyleLoaders({
      importLoaders: 1,
      sourceMap: isEnvProduction,
    }),
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /node_modules/,
    loader: 'file-loader'
  },
  {
    test: /\.(woff|woff2)$/,
    exclude: /node_modules/,
    loader: 'url-loader?prefix=font/&limit=5000'
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
  },
  {
    test: /\.(jpe?g|png|gif|svg)$/i,
    use: ['url-loader?limit=10000', 'img-loader']
  }
];