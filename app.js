const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors=require("cors")
const { userRouter,forumRouter } = require('./controllers');


// --- App config

const app = express();

// --- Middleware
app.use(cors({
    origin:"http://localhost:3000"
}))
    
mongoose.connect("mongodb://localhost:27017/masters_portal",{ useNewUrlParser : true }); 
app.use(morgan('common'));
app.use(express.static('./static/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(bodyParser.raw())

// --- Routes

app.use('/api/user', userRouter);
app.use('/api/forum',forumRouter);

// ---

module.exports = app;
