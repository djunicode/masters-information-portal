const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { authRequired } = require('../middleware/auth');
const controller = require('../controllers/user');

const router = Router();
router.post('/register', asyncHandler(controller.register));
router.post('/login', asyncHandler(controller.login));
router.post('/refresh',asyncHandler(controller.refresh))
router.get('/me', authRequired, asyncHandler(controller.getProfile));
router.get('/:id', asyncHandler(controller.getTagBySlug));
router.put('/me', authRequired, asyncHandler(controller.deleteTagBySlug));

module.exports = router;
