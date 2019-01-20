import debug from 'debug';

const prefix = 'smn';
const logger = debug(`${prefix}`);

export { logger as debug };
export default (name) => (
  debug(`${prefix}:${name}`)
);