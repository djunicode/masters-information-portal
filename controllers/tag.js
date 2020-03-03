const express = require('express');
const Tag = require('../models/tag');
//  winston logger
const logger=require("../config/logger")
const router = express.Router();

router.post('/', async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ err: 'Incomplet Fields' });
  }
  try {
    logger.info("Creating new tag")
    req.body.slug = [req.body.name.replace(/\s/g, '').toLowerCase()];
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


router.get('/:name', async (req, res) => {
  logger.info("Gettiing tags")
  try {
    // If no match ,then empty array would be returned..
    const data = await Tag.findOne({ name: req.params.name });
    if (data === undefined || data === null) {
      return res.status(404).send({ err: 'No Tag with Given Name found' });
    }
    return res.status(200).json(data);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).send({ err });
    } else {
      res.status(500).send({ err: 'Server Error' });
    }
  }
});

// @route:get "/tag/:slug"
// @desc:Get tag by slug name
// Slug:name of tag in lower case and without space in between
router.get('/slug/:slug', async (req, res) => {
  logger.info("Get tag (slug)")
  try {
    const slug = req.params.slug;
    const data = await Tag.findOne({ slug: { $in: slug } });
    if (data === undefined || data === null) {
      return res.status(404).send({ err: 'No Tag with Given Name found' });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// @route:delete "/tag"
// @desc:Remove Tag by id

router.delete('/:id', async (req, res) => {
  logger.info("Deleting tag")
  try {
    const deleteTag = await Tag.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ msg: `${deleteTag.name} is deleted successfully` });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).send({ err });
    } else {
      return res.status(500).send({ err: 'Server Error' });
    }
  }
});

 // Error Handler
router.use(function(err, req, res, next) {
  //winston logging
logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
   // render the error page
res.status(err.status||500).json(err.message)
})  



module.exports = router;
