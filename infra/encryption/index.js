const bcrypt = require('bcryptjs');

const SALT = process.env.SALT || 'djUnicode';

const encryptPassword = async function(next){
    const user = this
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
  }

module.exports = { encryptPassword }
