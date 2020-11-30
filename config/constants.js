const path = require('path');
const dotEnv = require('dotenv');

const parsedEnv = dotEnv.config({
  path: path.join(__dirname, '../.env.development'),
});

if (parsedEnv.error) {
  throw parsedEnv.error;
}

const config = {
  port: Number(process.env.PORT) || 8000,
  host: process.env.HOST || 'localhost',
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  saltRounds: Number(process.env.SALT_ROUNDS),
  rateLimitWindowInterval: Number(process.env.RATE_LIMIT_WINDOW_INTERVAL),
  rateLimitAttempts: Number(process.env.RATE_LIMIT_ATTEMPTS),
  dbConnectionUrl: process.env.DB_CONNECTION_URL,
  dbTestConnectionUrl: process.env.DB_TEST_CONNECTION_URL,
};

module.exports = config;
