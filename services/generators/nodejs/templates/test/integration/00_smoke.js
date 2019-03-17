const Service = require('../lib/service');

describe('[integration] smoke tests', () => {
  before('wait for service', Service.waitForHealthy);

  /**
   * GET /sys/health
   */
  describe('when calling /sys/health', () => {
    it('should respond with HTTP 200 (OK)', () => {
      return Service.client.get('/sys/health').expect(200);
    });
  });
});
