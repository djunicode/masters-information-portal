const { Router } = require('express');
const {authRequired} = require('../middleware/auth');
const {isOwner} = require('../middleware/forumAuth');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/forum');

const router = Router();
router.post('/',authRequired, asyncHandler(controller.create));
router.get('/', asyncHandler(controller.getAll));
router.get('/:id', asyncHandler(controller.getById));
router.put('/:id',authRequired,isOwner, asyncHandler(controller.updateById));
router.delete('/:id',authRequired,isOwner, asyncHandler(controller.deleteById));

module.exports = router;
