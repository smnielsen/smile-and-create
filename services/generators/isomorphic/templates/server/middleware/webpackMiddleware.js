const webpackServer = async app => {
  const webpack = require('webpack');
  const webpackConfig = require('../../webpack.config');
  const compiler = webpack(webpackConfig);
  const koaWebpack = require('koa-webpack');
  
  const middleware = await koaWebpack({ 
    compiler,
    hotClient: {
      autoConfigure: true,
    },
    devMiddleware: {
      noInfo: true,
      quiet: true,
      publicPath: '/'
    }});
  
  app.use(middleware);
};

export default webpackServer;