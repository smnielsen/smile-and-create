const supertest = require('supertest');
const config = require('../config');

exports.client = supertest(config.serviceUri);

exports.waitForHealthy = async (timeout = 5000) => {
  const startTime = Date.now();
  const tryHealthy = async () => {
    try {
      await exports.client.get('/sys/health').expect(200);
    } catch (err) {
      if (Date.now() - startTime > timeout) {
        throw new Error('Service did not start in time!');
      }
      setTimeout(tryHealthy, 500);
    }
  };

  return tryHealthy();
};
