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



// @route:get "/tag" || "/tag?isSchool=xyz"
// @desc:Get all tags if no query
// get only school tags if url: "/tags?isSchool=true"
router.get("/tag", async (req, res) => {
  try {
      const isSchool = req.query.isSchool
      // 
      if (isSchool) {
          if (isSchool == "true") {
              const tag = await Tag.find({ isSchool: true })
              res.status(200).json({tag})
          }
          else {
              const tag = await Tag.find({ isSchool: false })
              res.status(200).json({tag})
          }
      }
      else {
          const tag=await Tag.find({})
          res.status(200).json({tag})
      }
  }
  catch (err) {
      res.status(500).json(err)
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
