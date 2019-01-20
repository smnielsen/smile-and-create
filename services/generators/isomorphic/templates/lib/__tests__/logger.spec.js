import logger, { debug } from '../logger';

describe('lib/logger', () => {
  test('should be functions', () => {
    expect(typeof logger).toBe('function');
    expect(typeof debug).toBe('function');
  });
});