const Tag = require('../models/tag');
const logger = require('../config/logger');

/**
 * @route POST "/api/tag"
 */
exports.create = async (req, res) => {
  const doc = await Tag.create(req.body);
  logger.created('Tag', doc);
  return res.status(201).json(doc);
};

/**
 * @route GET "/api/tag"
 */
exports.getAll = async (req, res) => {
  const searchQuery = req.query;
  const docs = await Tag.find(searchQuery);
  if (!docs) {
    return res.status(404).json({
      msg: 'No documents found',
    });
  }

  logger.readMany('Tag', docs);
  return res.json(docs);
};

/**
 * @route GET "/api/tag/:slug"
 */
exports.getBySlug = async (req, res) => {
  const { slug } = req.params;
  const doc = await Tag.findOne({ slug });
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found',
    });
  }

  logger.readOne('Tag', doc);
  return res.json(doc);
};

/**
 * @route DELETE "/api/tag/:slug"
 */
exports.deleteBySlug = async (req, res) => {
  const { slug } = req.params;
  const doc = await Tag.findOneAndDelete({ slug });
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found',
    });
  }

  logger.deleted('Tag', doc);
  return res.json({
    msg: 'ok',
  });
};

/**
 * @route POST "/api/tag/:slug/follow"
 */
exports.follow = async (req, res) => {
  const { slug } = req.params;
  const doc = await Tag.findOne({ slug:slug });
  //Checking if tag exists
  if (doc==null) {
    return res.status(404).json({
      msg: 'Tag Not found',
    });
  }
  //Checking if user aldready follows the tag
  if(doc.followers.includes(req.user.id)){
    return res.status(403).json({
          msg:"You aldready follow this tag"
      })
  }
  doc.followers.push(req.user._id)
  await doc.save()
  req.user.tagFollows.push(doc._id)
  await req.user.save()
  return res.json(doc);
};

/**
 * @route POST "/api/tag/:slug/unfollow"
 */
exports.unfollow = async (req, res) => {
  const { slug } = req.params;
  //Checking if tag exists
  const doc = await Tag.findOne({ slug:slug });
  if (doc==null) {
    return res.status(404).json({
      msg: 'Tag Not found',
    });
  }
  //Checking if user does not follow the tag
  if(!doc.followers.includes(req.user.id)){
    return res.status(403).json({
          msg:"You don't follow this tag"
      })
  }
  //Removing user from followers array of the tag
  doc.followers.splice(doc.followers.indexOf(req.user.id), 1)
  //Removing the tag from the tagFollows array of the user
  req.user.tagFollows.splice(req.user.tagFollows.indexOf(doc.id,1))
 
  await doc.save()
  await req.user.save()
  return res.json(doc);
};