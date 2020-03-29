const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/tag');
const { authRequired } = require('../middleware/auth');

const router = Router();
router.post('/', asyncHandler(controller.create));
router.post('/:slug/follow',authRequired,asyncHandler(controller.follow));
router.post('/:slug/unfollow',authRequired,asyncHandler(controller.unfollow));
router.get('/', asyncHandler(controller.getAll));
router.get('/:slug', asyncHandler(controller.getBySlug));
router.delete('/:slug', asyncHandler(controller.deleteBySlug));

module.exports = router;