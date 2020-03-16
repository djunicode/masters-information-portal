const Forum = require('../models/forum');
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
      msg: 'No documents found',
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
      msg: 'Not found',
    });
  }

  logger.readOne('Forum', doc);
  return res.json(doc);
};

/**
 * @route PUT "/api/forum/:id"
 */
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const doc = await Forum.findByIdAndUpdate(id, req.body);
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found',
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
      msg: 'Not found',
    });
  }

  logger.deleted('Forum', doc);
  return res.json({
    msg: 'ok',
  });
};
