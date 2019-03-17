const _ = require('lodash');

exports.delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * "omitUndefined" removes top-level keys from `obj` which are `undefined`.
 * it's a kind of cleanup of the obj
 */
exports.omitUndefined = obj => _.omitBy(obj, _.isUndefined);
