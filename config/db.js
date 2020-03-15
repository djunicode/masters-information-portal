const mongoose = require('mongoose');
const { dbConnectionUrl, dbTestConnectionUrl } = require('./constants');
const logger = require('./logger');

mongoose.set('debug', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
  dbConnection: async () => {
    try {
      let dbConnUrl = process.env.NODE_ENV === 'test' ? dbTestConnectionUrl : dbConnectionUrl;

      await mongoose.connect(dbConnUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      logger.info('MongoDB connected!');
    } catch (error) {
      logger.error('MongoDB not connected!');
    }
  },
};
