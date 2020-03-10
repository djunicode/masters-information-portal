const { Router } = require('express');
const logger = require('../config/logger');
const Tag = require('../models/tag');

const router = Router();

/**
 * @route POST "/api/tag"
 */
router.post('/', async (req, res, next) => {
  const doc = await Tag.create(req.body).catch((e) => next(e));
  logger.created('Tag', doc);
  return res.status(201).json(doc);
});

/**
 * @route GET "/api/tag"
 */
router.get('/', async (req, res, next) => {
  const searchQuery = req.query;
  const docs = await Tag.find(searchQuery).catch((e) => next(e));
  if (!docs) {
    return res.status(404).json({
      msg: 'No documents found',
    });
  }

  logger.readMany('Tag', docs);
  return res.json(docs);
});

/**
 * @route GET "/api/tag/:slug"
 */
router.get('/:slug', async (req, res, next) => {
  const { slug } = req.params;
  const doc = await Tag.findOne({ slug }).catch((e) => next(e));
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found',
    });
  }

  logger.readOne('Tag', doc);
  return res.json(doc);
});

/**
 * @route DELETE "/api/tag/:slug"
 */
router.delete('/:slug', async (req, res, next) => {
  const { slug } = req.params;
  const doc = await Tag.findOneAndDelete({ slug }).catch((e) => next(e));
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found',
    });
  }

  logger.deleted('Tag', doc);
  return res.json({
    msg: 'ok',
  });
});

// -----

module.exports = router;
