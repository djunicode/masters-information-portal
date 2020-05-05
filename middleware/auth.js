const User = require('../models/user');
const { verifyJwt } = require('../infra/jwt');

/**
 * Requires a token in request headers.
 * Header format is
 * Authorization: Bearer token
 */
const authRequired = async (req, res, next) => {
  const header = req.header('Authorization');
  if (!header) {
    return res.status(401).json({
      msg: 'Please Provide JWT'
    });
  }
  const token = header.replace('Bearer', '').trim();
  try {
    const decoded = await verifyJwt(token);
    if (!decoded) {
      return res.status(401).json({
        msg: 'Invalid token'
      });
    }
    const user = await User.findOne({ _id: decoded._id });
    req.token = token;
    req.user = user;
    res.locals.user=user;
    next();
  } catch (e) {
    return res.status(401).json({
      msg: 'Invalid token'
    });
  }
};

const hasRoles=(list)=>{
  return function(req,res,next){
    // List of roles required to access

    const reqdRoles=list;

    // List of roles the user possesses
    // Receiving user roles from the jwt payload

    const acqdRoles=res.locals.user.role;

    // Check if user roles are a subset to the list of required roles
    const result = reqdRoles.every(val => acqdRoles.includes(val));
      console.log(result);  
      if(result==false){
        return res.send({
          status:403,
          error:"You are not capable of doing this,Sorry!"
        })
      }
      next();
  }
}

module.exports = { authRequired,hasRoles};
