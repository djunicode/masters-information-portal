const express = require('express');
const Tag = require('../models/tag');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const temp = await Tag.create(req.body);
    res.status(201).send({ tag: temp });
  } catch (e) {
    // Mongoose Error code
    if (e.code === 11000) {
      res.status(400).send({ err: e });
    } else {
      res.status(500).send({ err: 'Server Error' });
    }
  }
});



// @route:get "/tag" || "/tag?anyQuery=xyz
// @desc:Get all tags if no query ,else get filtered data.

router.get("/tag", async (req, res) => {
  try {
      // If no match ,then empty array would be returned..
      const data = await Tag.find(req.query)
      res.status(200).json(data)
  }
  catch (err) {
      res.status(500).json(err)
  }
})


// @route:get "/tag/:slug"
// @desc:Get tag by slug name
// Slug:name of tag in lower case and without space in between
app.get("/tag/:slug",async(req,res)=>{
  try{
      const slug=req.params.slug
      const data=await Tag.findOne({slug:slug})
      res.status(200).json(data)
  }
  catch(err){
      console.log(err)
      res.status(401).json(err)
  }
})



// @route:delete "/tag"
// @desc:Remove Tag by id
router.delete("/tag/:id",async(req,res)=>{
  try{
      const deleteTag=await Tag.findByIdAndDelete(req.params.id)
      res.status(200).json(`${deleteTag.name} is deleted successfully`)
  }
  catch(err){
      res.status(500).json({err})
  }
})


module.exports = router;
