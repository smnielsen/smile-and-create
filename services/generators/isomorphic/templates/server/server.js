import Koa from "koa";
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

import render from './render';
import assetsMiddleware from './middleware/assetsMiddleware';

import config from './config/config';
import logger from '../lib/logger';
import api from './api/api';

const debug = logger('server');

const { PORT } = config;

const run = async () => {
  const app = new Koa();
  const router = new Router();

  /**
 * Setup static resources
 */
  await assetsMiddleware(app);
  app.use(bodyParser());

  /**
 * API ROUTES
 */
  api(router);

  /**
 * RENDERING
 */
  router.get( "/*", async ctx => {
    render(ctx);
  } );

  app.use(router.routes());

  const server = app.listen(PORT, () => {
    debug(`Listening to ${PORT}`);
  });
  
  return server;
};

module.exports = run().catch(err => debug({ err }, `couldn't start server`));