'use strict';

const mongoose = require('mongoose');
const { dbConnectionUrl, dbTestConnectionUrl } = require('./constants');

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

			console.log({ status: 'DB connection successful' });
		} catch (error) {
			console.log({ status: 'DB connection successful', error: error.message });
		}
	},
};