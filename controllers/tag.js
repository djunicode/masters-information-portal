const express = require('express');
const Tag = require('../models/tag');
//  winston logger
const logger=require("../config/logger")
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    logger.info("Creating new tag")
    const temp = await Tag.create(req.body);
    res.status(201).send({ tag: temp });
  } catch (err) {
    // Mongoose Error code
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    if (err.code === 11000) {
      res.status(400).send({ err: err });
    } else {
      res.status(500).send({ err: 'Server Error' });
    }
  }
});



// @route:get "/tag" || "/tag?anyQuery=xyz
// @desc:Get all tags if no query ,else get filtered data.

router.get("/", async (req, res,next) => {
  try {
      logger.info("Gettiing tags")
      // If no match ,then empty array would be returned..
      const data = await Tag.find(req.query)
      res.status(200).json(data)
  }
  catch (err) {
      next(err)
  }
})


// @route:get "/tag/:slug"
// @desc:Get tag by slug name
// Slug:name of tag in lower case and without space in between
router.get("/:slug",async(req,res,next)=>{
  try{
      logger.info("Get tag (slug)")
      const slug=req.params.slug
      const data=await Tag.findOne({slug:slug})
      res.status(200).json(data)
  }
  catch(err){
    next(err)

  }
})



// @route:delete "/tag"
// @desc:Remove Tag by id
router.delete("/:id",async(req,res,next)=>{
  try{
      logger.info("Deleting tag")
      const deleteTag=await Tag.findByIdAndDelete(req.params.id)
      res.status(200).json(`${deleteTag.name} is deleted successfully`)
  }
  catch(err){
      next(err)
  }
})


 // Error Handler
router.use(function(err, req, res, next) {
  //winston logging
logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
   // render the error page
res.status(err.status||500).json(err.message)
})  



module.exports = router;
