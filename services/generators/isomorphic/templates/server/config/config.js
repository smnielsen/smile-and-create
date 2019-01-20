require('dotenv').config();

const envs = {
  development: 'dev',
  production: 'prod'
};

/* eslint-disable global-require,import/no-dynamic-require */
const env = envs[process.env.NODE_ENV || 'development'];
const envConfig = require(`./config.${env}`);
module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  HOST: process.env.HOST || '',
  ...envConfig
};