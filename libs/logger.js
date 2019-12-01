require('colors');

const createLogger = ({ name } = {}) => {
  const printLevel = level => {
    switch (level) {
      case 'debug':
        return 'DEBUG'.cyan.bold;
      case 'info':
        return 'INFO'.blue.bold;
      case 'success':
        return 'SUCCESS'.green.bold;
      case 'warn':
        return 'WARN'.yellow.bold;
      case 'error':
        return 'ERROR'.blue.bold;
      default:
        return 'TRACE'.bold;
    }
  };
  const start = level => `$ [${name}] ${printLevel(level)}`;
  // Create result object
  const result = (...msg) => result.log(...msg);

  // eslint-disable-next-line no-console
  result.log = (...msg) => console.log(start(), ...msg);
  // eslint-disable-next-line no-console
  result.debug = (...msg) => console.log(`${start('debug')}`, ...msg);
  // eslint-disable-next-line no-console
  result.info = (...msg) => console.log(`${start('info')}`, ...msg);
  // eslint-disable-next-line no-console
  result.success = (...msg) => console.log(`${start('success')}`, ...msg);
  // eslint-disable-next-line no-console
  result.warn = (...msg) => console.warn(`${start('warn')}`.blue, ...msg);
  // eslint-disable-next-line no-console
  result.error = (...msg) => console.error(`${start('error')}`.blue, ...msg);

  return result;
};

exports.create = createLogger;
module.exports = createLogger({ name: 'sac' });
