const User = require('../models/user');
const { comparePassword } = require('../infra/encryption');

/**
 * @route POST "/api/users/"
 */
exports.register = async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      msg: 'User already exists, try logging in!',
    });
  }
  const user = await new User(req.body);
  const token = await user.newAuthToken();
  await user.save()
  return res.status(201).send({ user, token });
};

/**
 * @route POST "/api/users/login"
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      msg: 'User email not found.',
    });
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      msg: 'User password didn\'t match.',
    });
  }

  const token = await user.newAuthToken();
  return res.send({
    user,
    token,
  });
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

  return res.json(user);
};

/**
 * @route GET "/api/users/:id"
 */
exports.getById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
  }

  return res.json(user);
};
