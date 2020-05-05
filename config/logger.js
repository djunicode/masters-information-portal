const { createLogger, transports, format } = require('winston');
const chalk = require('chalk');
const path = require('path');

// Setting the path for log file
const filename = path.join('logDir', 'loggers.log');

/**
 * Function to set color settings of a strin
 */
function formatMessage(info) {
  let level = info.level;
  if (level) {
    level = level.toUpperCase();
  }
  const msg = `${info.timestamp}  ${info.level} [${info.label}]: ${info.message}`;
  if (level === 'INFO') {
    return chalk.dim.cyan(msg);
  }
  if (level === 'WARN') {
    //* Hex color is dark orange
    //* Note :italic is not widely supported : refer chalk.js npm page : https://www.npmjs.com/package/chalk
    return chalk.hex('#FF8C00').italic(msg);
  }
  if (level === 'DEBUG') {
    //* Hex color is dark orange
    //* Note :italic is not widely supported : refer chalk.js npm page : https://www.npmjs.com/package/chalk
    return chalk.yellowBright(msg);
  }
  if (level === 'ERROR') {
    //* Hex color is Red, the defaul red was a bit meh..!
    return chalk.hex('#ff0000').bold(msg);
  }
  return msg;
}
// Config for Winston logger
const LOGGER_OPTIONS = {
  level: 'debug',
  handleExceptions: true,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.printf(info => formatMessage(info))
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.json(),
        format.printf(info => formatMessage(info))
      )
    })
  ]
};

/**
 * Global logger
 */
const logger = createLogger(LOGGER_OPTIONS);

// -----

/**
 * Logs the creation of a new document
 * @param {String} model - Model which is used
 * @param {*} doc - Document which is created
 */
function created(model, doc) {
  logger.info(`Created ${model} of id ${doc._id}`);
}

/**
 * Logs the reading of a document
 * @param {String} model - Model which is used
 * @param {*} doc - Document which is read
 */
function readOne(model, doc) {
  logger.info(`Read ${model} of id ${doc._id}`);
}

/**
 * Logs the reading of multiple document
 * @param {String} model - Model which is used
 * @param {Array} docList - List of documents accessed
 */
function readMany(model, docList) {
  logger.info(`Read multiple ${model} of count ${docList.length}`);
}

/**
 * Logs the updation of a document
 * @param {String} model - Model which is used
 * @param {*} doc - Document which is updated
 */
function updated(model, doc) {
  logger.info(`Update ${model} of id ${doc._id}`);
}

/**
 * Logs the deletion of a document
 * @param {String} model - Model which is used
 * @param {String} doc - Document which is deleted
 */
function deleted(model, doc) {
  logger.info(`Deleted ${model} of id ${doc}`);
}

// -----

module.exports = {
  baseLogger: logger,
  info: s => logger.info(s),
  error: s => logger.error(s),
  debug: s => logger.debug(s),
  log: (level, s) => logger.log(level, s),
  warn: s => logger.warn(s),

  created,
  readOne,
  readMany,
  updated,
  deleted
};
