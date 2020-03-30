const Forum = require('../models/forum');
const User = require('../models/user');
const Tag=require("../models/tag")
const logger = require('../config/logger');

/**
 * @route POST "/api/forum"
 */
exports.create = async (req, res) => {
  const doc = await Forum.create(req.body);
  if (req.body.isAnswer) {
    const forum = await Forum.findByIdAndUpdate(req.body.parentId, { $push: { answers: doc._id } });
    logger.info(
      `Created answer ${doc._id} to question ${forum._id} posted by user ${req.body.author}`
    );
  }

  logger.created('Forum', doc);
  return res.status(201).json(doc);
};

/**
 * @route GET "/api/forum?slugs[]=node&title=xyz"
 * Extra query parameter - slugs: [String], array of tag slugs
 */
exports.getAll = async (req, res) => {
  const queryFilter = req.query;

  if(queryFilter.slugs) {
    const { slugs } = queryFilter;
    const tags_id = await Tag.find({ slug: { $in:slugs } }).select({ _id:1 });
    delete queryFilter.slugs;
    queryFilter.tags = { $in: tags_id };
  }
  
  const docs = await Forum.find(queryFilter);
  if (!docs) {
    return res.status(404).json({
      msg: 'No documents found'
    });
  }
  
  logger.readMany('Forum', docs);
  return res.json(docs);
};

/**
 * @route GET "/api/forum/:id"
 */
exports.getById = async (req, res) => {
  const { id } = req.params;
  const doc = await Forum.findById(id);
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found'
    });
  }

  logger.readOne('Forum', doc);
  return res.json(doc);
};

/**
 * @route POST "/api/forum/:id/upvote"
 */
exports.upvoteById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const doc = await Forum.findById(id);
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found'
    });
  }
  //* User has already upvoted it
  if (doc.upvoters.includes(userId)) {
    return res.status(409).send({
      msg: 'Cannot upvote more than once.'
    });
  }
  //* User has already downvoted it
  if (doc.downvoters.includes(userId)) {
    await Forum.findByIdAndUpdate(id, { $pull: { downvoters: userId } });
    logger.info(`Forum Question ${id} removed downvote by ${userId}`);
    return res.status(200).send({});
  }

  //* User has not reacted at all
  await Forum.findByIdAndUpdate(id, { $push: { upvoters: userId } });
  logger.info(`Forum Question ${id} upvoted by ${userId}`);
  return res.status(201).send({});
};

/**
 * @route POST "/api/forum/:id/downvote"
 */
exports.downvoteById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const doc = await Forum.findById(id);
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found'
    });
  }
  if (doc.downvoters.includes(userId)) {
    return res.status(409).send({
      msg: 'Cannot downvote more than once.'
    });
  }
  //* User has already upvoted it
  if (doc.upvoters.includes(userId)) {
    await Forum.findByIdAndUpdate(id, { $pull: { upvoters: userId } });
    logger.info(`Forum Question ${id} removed upvote by ${userId}`);
    return res.status(200).send({});
  }
  await Forum.findByIdAndUpdate(id, { $push: { downvoters: userId } });
  logger.info(`Forum Question ${id} downvoted by ${userId}`);
  return res.status(201).send({});
};

/**
 * @route POST "/api/forum/:id/pin"
 */
exports.pinById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  if (req.user.pinnedQuestions.includes(id)) {
    return res.status(409).send({
      msg: 'Already pinned question'
    });
  }
  const doc = await Forum.findById(id);
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found'
    });
  }
  await User.findByIdAndUpdate(userId, { $push: { pinnedQuestions: id } });
  logger.info(`Forum Question ${id} pinned by ${userId}`);
  return res.status(201).send({});
};

/**
 * @route PUT "/api/forum/:id"
 */
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const doc = await Forum.findByIdAndUpdate(id, req.body,{new:true});
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found'
    });
  }

  logger.updated('Forum', doc);
  return res.json(doc);
};

/**
 * @route DELETE "/api/forum/:id"
 */
exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const doc = await Forum.findByIdAndDelete(id);
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found'
    });
  }

  logger.deleted('Forum', doc);
  return res.json({
    msg: 'ok'
  });
};
