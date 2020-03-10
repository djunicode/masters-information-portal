const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('./config/logger');

const cors = require('cors');
const { userRouter, forumRouter, tagRouter } = require('./controllers');

// --- App config

const app = express();

// --- Middleware

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(morgan('common'));
app.use(express.static('./static/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// --- Routes

app.use('/api/user', userRouter);
app.use('/api/forum', forumRouter);
app.use('/api/tag', tagRouter);

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json(err.errors);
  }

  logger.error(err);
  return res.status(500).json(err);
});

// ---
module.exports = app;
