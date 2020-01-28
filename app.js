const express = require('express');
const morgan = require('morgan');
const path = require('path');

const userRouter = require('./controllers/user');

// --- App config

const app = express();

// --- Middleware

app.use(morgan('common'));
app.use(express.static('./static/'));

// --- Routes

app.use('/', userRouter);

// ---

module.exports = app;
