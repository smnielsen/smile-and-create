/**
 * @typedef {Error | { expose: boolean, status: number, code?: string }} HttpError
 *
 * "createError" creates an error ready for our koa error middleware
 *
 * @param {string} message
 * @param {{ statusCode?: number, code?: string }} param1
 * @returns {HttpError}
 */
exports.createError = (message, { statusCode = 500, code } = {}) => {
  const err = new Error(message);
  err.expose = true;
  err.status = statusCode;
  err.code = code;
  return err;
};
