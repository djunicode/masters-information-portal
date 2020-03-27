const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { authRequired,hasRoles} = require('../middleware/auth');
const { upload } = require('../middleware/multer');
const controller = require('../controllers/user');
const reqdRoles=require('../constants/roles')

const router = Router();

router.post('/register', asyncHandler(controller.register));
router.post('/login', asyncHandler(controller.login));
router.post('/refresh',asyncHandler(controller.refresh))
router.post('/upload',authRequired,upload.single('avatar'),asyncHandler(controller.uploadProfilePhoto));
<<<<<<< HEAD
router.get('/me', authRequired,hasRoles(reqdRoles),asyncHandler(controller.getProfile));
=======
router.get('/me', authRequired,asyncHandler(controller.getProfile));
>>>>>>> 00bdb56b3f1d3e9fb5b9c34507c82734334e7e98
router.get('/:id', asyncHandler(controller.getById));
router.get('/:id/avatar', asyncHandler(controller.getProfilePhoto));
router.put('/me', authRequired, asyncHandler(controller.updateProfile));

module.exports = router;
