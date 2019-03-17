module.exports = app =>
  app
    // Service health endpoint
    .get('/sys/health', async ctx => {
      ctx.status = 200;
      ctx.body = {
        status: 'OK',
      };
    });
