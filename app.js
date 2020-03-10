const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const cors = require("cors")
const { userRouter,forumRouter,tagRouter } = require('./controllers');

// --- App config
let mongoUri = 'mongodb://localhost:27017/masters_portal';
if (process.env.NODE_ENV == 'test') {
  mongoUri = 'mongodb://localhost:27017/masters_portal_test';
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

// --- Middleware

app.use(cors({
    origin:"http://localhost:3000"
}))
app.use(morgan('common'));
app.use(express.static('./static/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// --- Routes

app.use('/api/users', userRouter);
app.use('/api/forum', forumRouter);
app.use('/api/tag', tagRouter);

// ---
module.exports = app;
