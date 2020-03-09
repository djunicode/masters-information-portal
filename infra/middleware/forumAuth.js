const Forum = require('../../models/forum');

const owner = async (req,res,next)=>
{
    try
    {    console.log(req.user._id );
        const forum = await Forum.findById(req.params.id);
        console.log(forum.poster, forum.text);
        if(req.user._id == forum.poster.toString()){
            //console.log('kaata');
            return next();
        }                
    }
    catch(err)
    {
        console.log(err);
        res.status(401).send({error:'Invalid Request!'})
    }
}

module.exports = {owner};