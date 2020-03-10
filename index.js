const mongoose = require('mongoose');

const app = require('./app');
const logger = require('./config/logger');

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';

/**
 * Sets up MongoDB connection first and then listens for connections.
 */
async function setup() {
  let mongoUri = 'mongodb://localhost:27017/masters_portal';
  if (process.env.NODE_ENV === 'test') {
    mongoUri = 'mongodb://localhost:27017/masters_portal_test';
  }

  mongoose.set('useCreateIndex', true);

  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  logger.info('MongoDB connected!');

  app.listen(PORT, HOST, () => {
    logger.info(`Server started listening on http://${HOST}:${PORT}`);
  });
}

// -----

setup();
