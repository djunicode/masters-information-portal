const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/chat');

const { authRequired } = require('../middleware/auth');

const router = Router();

router.get('/',authRequired, asyncHandler(controller.getNotifications));
router.post('/read',authRequired, asyncHandler(controller.readAll));
router.post('/:id/read',authRequired, asyncHandler(controller.readOne));
router.delete('/',authRequired, asyncHandler(controller.deleteAll));
router.delete('/:id',authRequired ,asyncHandler(controller.deleteOne));

module.exports=router;

