const Knex = require('knex');
const debug = require('debug')('::util/knexHelpers');
const knexConfig = require('../knexfile');

exports.POSTGRES_ERRORS = {
  UNIQUE_VIOLATION: '23505',
};

const maskUrlPassword = url => url.replace(/:[^:]+@/, ':***@');
debug(`Connecting to ${maskUrlPassword(knexConfig.connection)}`);

exports.knex = Knex(knexConfig);

/**
 * @template T
 * @param {(trx: Knex.Transaction) => (T|PromiseLike<T>)} fn
 * @param {Knex.Transaction|null} [trx]
 */
exports.withTransaction = (trx, fn) =>
  Promise.resolve().then(() => {
    if (trx) {
      return fn(trx);
    }

    return exports.knex.transaction(ktrx =>
      // eslint-disable-next-line promise/no-nesting
      Promise.resolve(ktrx)
        .then(fn)
        .then(ktrx.commit)
        .catch(ktrx.rollback),
    );
  });
