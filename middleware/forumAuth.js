const Forum = require('../models/forum');

const isOwner = async (req,res,next)=>
{
    const forum = await Forum.findById(req.params.id);
    if(!forum)
        return res.status(400).json({msg:'Post not found'});
    if(req.user._id != forum.poster.toString())
        return res.status(400).json({msg:'Unauthoried'});
    return next();
}

module.exports = {isOwner}; 