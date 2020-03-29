const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const {authRequired,hasRoles} = require('../middleware/auth');
const {isTagOwner} = require('../middleware/tagAuth');
const controller = require('../controllers/tag');

const router = Router();
router.post('/',authRequired,hasRoles(['admin']), asyncHandler(controller.create));
router.get('/', asyncHandler(controller.getAll));
router.get('/:slug', asyncHandler(controller.getBySlug));
router.put('/:slug',authRequired,hasRoles(['admin']),isTagOwner,asyncHandler(controller.updateBySlug))
router.delete('/:slug',authRequired,hasRoles(['admin']),isTagOwner, asyncHandler(controller.deleteBySlug));

module.exports = router;
