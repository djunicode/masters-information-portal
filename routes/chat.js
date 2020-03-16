const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/chat');
const auth=require('../middleware/auth')

const router = Router();
router.post('/',auth,asyncHandler(controller.create));

module.exports = router;
