const Forum = require('../models/forum');
const User = require('../models/user');
const logger = require('../config/logger');

/**
 * @route POST "/api/forum"
 */
exports.create = async (req, res) => {
  const doc = await Forum.create(req.body);
  logger.created('Forum', doc);
  return res.status(201).json(doc);
};

/**
 * @route GET "/api/forum"
 */
exports.getAll = async (req, res) => {
  const searchQuery = req.query;
  const docs = await Forum.find(searchQuery);
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
 * @route PUT "/api/forum/:id/upvote"
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
    return res.status(200).send({});
  }

  //* User has not reacted at all
  await Forum.findByIdAndUpdate(id, { $push: { upvoters: userId } });
  return res.status(201).send({});
};

/**
 * @route PUT "/api/forum/:id/downvote"
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
    return res.status(200).send({});
  }
  await Forum.findByIdAndUpdate(id, { $push: { downvoters: userId } });
  return res.status(201).send({});
};

/**
 * @route PUT "/api/forum/:id/pin"
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
  return res.status(201).send({});
};

/**
 * @route PUT "/api/forum/:id"
 */
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const doc = await Forum.findByIdAndUpdate(id, req.body);
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
