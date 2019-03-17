/**
 * Centralized config
 */

module.exports = {
  app: {
    port: parseInt(process.env.PORT, 10) || 8080,
  },
  db: {
    client: 'pg',
    connection: process.env.DB_URL,
    seeds: {
      directory: './seeds',
    },
  },
};
