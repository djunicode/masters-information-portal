const app = require('./app');

const PORT = process.env.PORT || 8002;
const HOST = process.env.HOST || 'localhost';
const logger=require("./config/logger")

app.listen(PORT, HOST, () => {
  logger.info(`Server started listening on http://${HOST}:${PORT}`);
  console.info(`Server started listening on http://${HOST}:${PORT}`);
});
