const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { authRequired } = require('../middleware/auth');
const controller = require('../controllers/forum');

const router = Router();
router.post('/', asyncHandler(controller.create));
router.get('/', asyncHandler(controller.getAll));
router.get('/:id', asyncHandler(controller.getById));
router.put('/:id/upvote', authRequired, asyncHandler(controller.upvoteById));
router.put('/:id/downvote', authRequired, asyncHandler(controller.downvoteById));
router.put('/:id/pin', authRequired, asyncHandler(controller.pinById));
router.put('/:id', asyncHandler(controller.updateById));
router.delete('/:id', asyncHandler(controller.deleteById));

module.exports = router;
