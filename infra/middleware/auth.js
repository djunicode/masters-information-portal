const jwt = require("jsonwebtoken")
const SALT = process.env.SALT || 'djUnicode';
const User = require("../../models/user")
  
//Auth middleware
const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim()     
        const decoded  = jwt.verify(token, SALT)
        const user  = await User.findOne({ _id:decoded._id, 'tokens.token': token})

        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({error:'Please authenticate!'})
    }
}

module.exports = {auth}
