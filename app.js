const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const logger = require('./config/logger');
const { devProfile } = require('./config/morganConfig');
const { directives, limiter, options } = require('./config/middlewares');

const { userRouter, forumRouter, tagRouter, chatRouter,notificationsRouter } = require('./routes');

// --- App config

const app = express();

// --- Middleware

app.set('json spaces', 2);

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// morgan
app.use(morgan(devProfile));

// express-rate-limit
app.use(limiter);

// helmet
app.use(helmet());
app.use(helmet.contentSecurityPolicy({ directives }));
// app.use(helmet.noCache()); //helmet noCache is deprecated

// cors
app.use(cors(options));

// --- Routes
app.use('/api/users', userRouter);
app.use('/api/tags', tagRouter);
app.use('/api/chats', chatRouter);
app.use('/api/forum', forumRouter);
app.use('/api/notifications',notificationsRouter)

// --- Documentation
app.use('/docs/models', express.static(path.join(__dirname, '/docs/models')));
app.use('/docs/routes', express.static(path.join(__dirname, '/docs/routes')));

app.use(express.static(path.join(__dirname, 'webapp', 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'webapp', 'build', 'index.html'));
});

// TODO: add 404 resource not found route

/**
 * Error handler.
 * Sends 400 for Mongoose validation errors.
 * 500 otherwise.
 * Do all error handling here.
 */
app.use((err, req, res, next) => {
  logger.error(err);
console.log(err)
  if (err.name === 'ValidationError') {
    return res.status(400).json(err.errors);
  }

  return res.status(500).json(err);
});

// ---

module.exports = app;
