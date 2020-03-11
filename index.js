'use strict';

const app = require('./app');
const { dbConnection } = require('./config/db');
const { port, host } = require('./config/constants');
const serverIP = ip.address();

const main = async () => {
	await dbConnection();

	app.listen(port, host, () => {
		console.log({
			status: 'HTTP server listening',
			port,
			host: serverIP,
		});
	});
};

if (typeof module !== 'undefined' && !module.parent) {
	main();
}
