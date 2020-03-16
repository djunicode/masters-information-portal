const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/tag');

const router = Router();
router.post('/', asyncHandler(controller.create));
router.get('/', asyncHandler(controller.getAll));
router.get('/:slug', asyncHandler(controller.getBySlug));
router.delete('/:slug', asyncHandler(controller.deleteBySlug));

module.exports = router;
