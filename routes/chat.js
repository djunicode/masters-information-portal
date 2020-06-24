const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/chat');
const { authRequired } = require('../middleware/auth');

const router = Router();
router.post('/', authRequired, asyncHandler(controller.create));
router.get('/',authRequired,asyncHandler(controller.getChats));

module.exports = router;
