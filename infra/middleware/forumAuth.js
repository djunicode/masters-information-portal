const Forum = require('../../models/forum');

const owner = async (req,res,next)=>
{
    try
    {    
        const forum = await Forum.findById(req.params.id);
        if(req.user._id == forum.poster.toString())
            return next();
    }
    catch(err)
    {
        console.log(err);
        res.status(401).send({error:'Invalid Request!'})
    }
}

module.exports = {owner};