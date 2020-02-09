const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const { userRouter,forumRouter,chatRouter } = require('./controllers');


// --- App config

const app = express();

// --- Middleware

    
mongoose.connect("mongodb://localhost:27017/masters_portal",{ useNewUrlParser : true }); 
app.use(morgan('common'));
app.use(express.static('./static/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(bodyParser.raw())

// --- Routes

app.use('/api/user', userRouter);
app.use('/api/forum',forumRouter);
app.use('/api/chat',chatRouter);

// ---

module.exports = app;
