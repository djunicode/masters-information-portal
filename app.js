const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { userRouter } = require('./controllers');

// --- App config

const app = express();

// --- Middleware

app.use(morgan('common'));
app.use(express.static('./static/'));

// --- Routes

app.use('/api/user', userRouter);

// ---

module.exports = app;
