import db from '../db/db';

export default router => {
  router.get('/trips', async ctx => {
    const trips = db.getTrips();
    ctx.status = 200;
    ctx.body = {
      meta: {
        size: trips.length
      },
      data: trips
    };
  });
};