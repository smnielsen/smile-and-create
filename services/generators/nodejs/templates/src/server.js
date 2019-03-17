const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const debug = require('debug')('<%= name %>::server');

const config = require('./config');
const errorMiddleware = require('./middleware/error');
const { listenAndWait } = require('./util/server-await');
const { knex } = require('./util/knexHelpers');
const initSysRoutes = require('./routes/sys');
const initModelRoutes = require('./routes/trips');

const sys = new Router();
initSysRoutes(sys);

// routes for "normal" authorized routes
const app = new Router();
initModelRoutes(app);

// create koa app with default middleware
const koa = new Koa();
koa.use(errorMiddleware);
koa.use(
  bodyParser({
    enableTypes: ['json'],
    onerror(err, ctx) {
      ctx.throw(400, err.message);
    },
  }),
);

// add routers
koa.use(sys.routes());
koa.use(app.routes());

// if files is directly executed, start the server
if (require.main === module) {
  Promise.resolve()
    .then(async () => {
      // init db
      debug('Migrating latest database migration...');
      await knex.migrate.latest({
        directory: path.resolve(__dirname, './migrations'),
      });

      // start server
      const server = await listenAndWait({ app: koa, port: config.app.port });
      debug(`Server started on port: ${config.app.port}`);

      // add kill signal handler
      process.on('SIGTERM', () => {
        server.stop();
        knex.destroy();
        setTimeout(() => process.exit(0), 100);
      });

      return null;
    })
    .catch(err => {
      debug(`:error: ${err.message}`, err);
      process.exit(1);
    });
}
