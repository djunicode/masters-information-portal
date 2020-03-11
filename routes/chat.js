'use strict';

const router = require('express').Router();
const { chat, ret } = require('../controllers/chat');

router.post('/chat', chat);

router.get('/ret', ret);

module.exports = router;