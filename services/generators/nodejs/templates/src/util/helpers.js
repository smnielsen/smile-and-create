const _ = require('lodash');

/**
 * "isEmpty" tests for input to be not `undefined`, `null` or `''`
 * (empty string)
 *
 * @template T
 * @param {T|undefined|null|""} input
 * @returns {input is T}
 */
exports.isEmpty = input => _.isNil(input) || input === '';

/**
 * "omitEmpty" removes "empty" fields from the given object. we consider empty
 * `null`, `undefined` and `''` (empty string)
 *
 * @template T
 * @param {T} obj
 * @returns {T}
 */
exports.omitEmpty = (obj, always = {}) => ({
  ..._.omitBy(obj, exports.isEmpty),
  ...always,
});
