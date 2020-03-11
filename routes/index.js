'use strict';

const router = require('express').Router();
const chatRouter = require('./chat');
const forumRouter = require('./forum');
const tagRouter = require('./tag');
const userRouter = require('./user');

router.use('/chat', chatRouter);

router.use('/forum', forumRouter);

router.use('/tag', tagRouter);

router.use('/user', userRouter);

module.exports = router;