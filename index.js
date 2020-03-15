const app = require('./app');
const attachChatApp = require('./infra/webSockets');
const { dbConnection } = require('./config/db');
const logger = require('./config/logger');
const { port, host } = require('./config/constants');

/**
 * Sets up the project
 */
async function main() {
	// Wait for MongoDB connection
	await dbConnection();

	// Websockets setup
	const server = attachChatApp(app);

	// Return after setup
	return server;
}

// -----

main().then(server => {
	server.listen(port, host, () => {
		logger.info(`🔥 Server started listening on http://${host}:${port}`);
	});
});
