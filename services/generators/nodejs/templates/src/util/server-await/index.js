const stoppable = require('stoppable');

exports.logExitOnUnhandled = ({ logger }) => {
  // extended logging for unhandled rejections/exceptions
  process.on('unhandledRejection', (reason, p) => {
    logger.error(
      'Unhandled Rejection at: ',
      p,
      ` reason: ${reason ? reason.stack : reason}`,
    );
    process.exit(1);
  });
  process.on('uncaughtException', err => {
    logger.error(`uncaughtException: ${err.message} ${err.stack}`);
    process.exit(1);
  });
};

exports.listenAndWait = ({ app, port }) => {
  let server;

  return new Promise((resolve, reject) => {
    server = app.listen(port, err => (err ? reject(err) : resolve(server)));
    server = stoppable(server);
  });
};
