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
