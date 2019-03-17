const debug = require('debug')('<%= name %>::route/trips');
const tripsModel = require('../models/trips');

module.exports = app =>
  app
    // List all trips
    .get('/v1/trips', async ctx => {
      const { page = 0, pageSize = 10, sort = false } = ctx.query;
      debug(`Sort trips ${sort}`);
      const trips = await tripsModel.list({
        sort,
        page,
        pageSize,
      });

      ctx.status = 200;
      ctx.body = {
        meta: {
          page,
          pageSize,
          sortOrder: sort ? 'ASC' : 'none',
          count: trips.length,
        },
        data: trips,
      };
    })
    .post('/v1/trips', async ctx => {
      debug('create trip with body', ctx.request.body);

      const trip = await tripsModel.create({
        ...ctx.request.body,
      });

      ctx.status = 201;
      ctx.body = { data: trip };
    })
    // List all trips
    .get('/v1/trips/:tripId', async ctx => {
      const { tripId } = ctx.params;

      const trip = await tripsModel.get({
        where: { id: tripId },
      });

      ctx.status = 200;
      ctx.body = { data: trip };
    })
    // Update a trip
    .patch('/v1/trips/:tripId', async ctx => {
      const { tripId } = ctx.params;
      debug(`Updating "${tripId}" with body`, ctx.request.body);

      const trip = await tripsModel.update(ctx.request.body, {
        where: { id: tripId },
      });

      ctx.status = 200;
      ctx.body = { data: trip };
    })
    // Delete a trip
    .patch('/v1/trips/:tripId', async ctx => {
      const { tripId } = ctx.params;

      await tripsModel.delete({
        where: { id: tripId },
      });

      ctx.status = 200;
      ctx.body = { data: { id: tripId } };
    });
