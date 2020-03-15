const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/chat');

const router = Router();
router.post('/', asyncHandler(controller.create));

module.exports = router;
