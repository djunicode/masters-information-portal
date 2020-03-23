const User = require('../models/user');
const { comparePassword } = require('../infra/encryption');
const { createJwt,createRefreshToken } = require('../infra/jwt');
const tokenList = {}
/**
 * @route POST "/api/users/register"
 */
exports.register = async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      msg: 'User already exists, try logging in!'
    });
  }

  const user = await new User(req.body);
  const token = await user.newAuthToken();
  const refreshToken = await createRefreshToken({ _id: user.id });
  tokenList[refreshToken] = {id:user.id ,refreshToken:refreshToken}
  await user.save()
  const userObject = user.getPublicProfile()
  return res.status(201).send({ userObject, token ,refreshToken });
};

/**
 * @route POST "/api/users/login"
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      msg: 'User email not found.'
    });
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      msg: "User password didn't match."
    });
  }

  const token = await user.newAuthToken();
  const refreshToken = await createRefreshToken({ _id: user.id });
  tokenList[refreshToken] = {id:user.id ,refreshToken:refreshToken}
  const userObject = user.getPublicProfile()
  return res.send({userObject, token, refreshToken });
};

/**
 * @route POST "/api/users/refresh"
 */
exports.refresh = async (req, res) => {
    if((req.body.refreshToken) && (req.body.refreshToken in tokenList)) {
        const token = await createJwt({ _id: tokenList[req.body.refreshToken].id })
        res.status(200).send({
            token : token
        })
    }else{
        res.status(404).send({msg:'Invalid request'})
    }
};

/**
 * @route GET "/api/users/me"
 */
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user.getPublicProfile());
};

/**
 * @route PUT "/api/users/me"
 */
exports.updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.update(req.body);

  return res.json(user.getPublicProfile());
};

/**
 * @route GET "/api/users/:id"
 */
exports.getById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
  }

  return res.json(user.getPublicProfile());
};

/**
 * @route POST "/api/users/upload"
 */
exports.uploadProfilePhoto = async (req, res) => {
  req.user.avatar = req.file.buffer
  await req.user.save()
  res.status(200).send({
    msg : 'Profile photo uploaded successfully'
  })
};

/**
 * @route GET "/api/users/:id/avatar"
 */
exports.getProfilePhoto = async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user || !user.avatar) {
    res.status(404).send();
  }
  res.set('Content-Type','image/jpg')
  res.send(user.avatar)
};