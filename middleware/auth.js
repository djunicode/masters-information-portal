const User = require('../models/user');
const { verifyJwt } = require('../infra/jwt');

/**
 * Requires a token in request headers.
 * Header format is
 * Authorization: Bearer token
 */
const authRequired = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer', '').trim();
  const decoded = verifyJwt(token);
  const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

  if (!user) {
    return res.status(401).json({
      msg: 'Invalid token',
    });
  }

  req.token = token;
  req.user = user;
  next();
};

module.exports = { authRequired };
