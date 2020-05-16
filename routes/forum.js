const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { authRequired } = require('../middleware/auth');
const { isOwner } = require('../middleware/forumAuth');
const controller = require('../controllers/forum');

const router = Router();
router.post('/', authRequired, asyncHandler(controller.create));
router.get('/', asyncHandler(controller.getAll));
router.get('/recommended',authRequired,asyncHandler(controller.getRecommended));
router.get('/:id', asyncHandler(controller.getById));
router.post('/:id/upvote', authRequired, asyncHandler(controller.upvoteById));
router.post('/:id/downvote', authRequired, asyncHandler(controller.downvoteById));
router.post('/:id/pin', authRequired, asyncHandler(controller.pinById));
router.put('/:id', authRequired, isOwner, asyncHandler(controller.updateById));
router.delete('/:id', authRequired, isOwner, asyncHandler(controller.deleteById));

module.exports = router;
