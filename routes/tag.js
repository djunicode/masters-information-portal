const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/tag');
const { authRequired, hasRoles } = require('../middleware/auth');
const roles = require('../constants/roles');

const router = Router();

router.post('/', authRequired, asyncHandler(controller.create));
router.post('/:slug/follow', authRequired, asyncHandler(controller.follow));
router.post('/:slug/unfollow', authRequired, asyncHandler(controller.unfollow));
router.get('/', asyncHandler(controller.getAll));
router.get('/:slug', asyncHandler(controller.getBySlug));
router.put('/:slug', authRequired, hasRoles([roles.ADMIN]), asyncHandler(controller.updateBySlug));
router.delete(
  '/:slug',
  authRequired,
  hasRoles([roles.ADMIN]),
  asyncHandler(controller.deleteBySlug)
);

module.exports = router;
