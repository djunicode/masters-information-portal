'use strict';

const router = require('express').Router();
const chatRouter = require('./chat');
const forumRouter = require('./forum');
const tagRouter = require('./tag');
const userRouter = require('./user');

app.use('/chat', chatRouter);
app.use('/forum', forumRouter);
app.use('/tag', tagRouter);
app.use('/user', userRouter);

module.exports = router;