const getDefaults = error => {
  const defaults = { status: 500 };
  switch (error.status) {
    case 401: {
      defaults.code = 'UNAUTHORIZED';
      break;
    }
    case 403: {
      defaults.code = 'FORBIDDEN';
      break;
    }
    case 404: {
      defaults.code = 'RESOURCE_NOT_FOUND';
      break;
    }
    case 409: {
      defaults.code = 'CONFLICT';
      break;
    }
    case 400: {
      defaults.code = 'BAD_REQUEST';
      break;
    }
    case 415: {
      defaults.code = 'MEDIA_TYPE';
      break;
    }
    case 502: {
      defaults.code = 'BAD_GATEWAY';
      break;
    }
    default: {
      defaults.code = 'UNKNOWN';
      break;
    }
  }

  return defaults;
};

/**
 * Set default values (`code`, `message`) on error if they're not set. This
 * will change `error` in-place.
 *
 * @param {Error} error
 * @param {obj} defaults
 * @returns {Error}
 */
const setErrorDefaults = (error, defaults) => {
  Object.entries(defaults).forEach(([key, val]) => {
    if (!error[key]) {
      // eslint-disable-next-line no-param-reassign
      error[key] = val;
    }
  });

  return error;
};

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    setErrorDefaults(error, getDefaults(error));

    if (error.expose === true) {
      ctx.status = error.status;
      ctx.body = {
        errorMessage: error.message,
        errorCode: error.code,
      };
      ctx.app.emit('error', error, ctx);
    } else {
      throw error;
    }
  }
};
