
import serve from 'koa-static';
import path from "path";
import config from '../config/config';
import { debug } from '../../lib/logger';

export default async app => {
  if (config.NODE_ENV === 'development') {
    const webpackServer = require('./webpackMiddleware').default;
    await webpackServer(app);
    app.use(serve(path.resolve( __dirname, "../../build" ), {}));
  } else {
    debug(`Assets: ${path.resolve( __dirname, "..", '..' )}`);
    app.use(serve(path.resolve( __dirname, "..", '..' ), {}));
  }
};