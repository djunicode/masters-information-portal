const { Router } = require('express');
const logger = require('../config/logger');
const Tag = require('../models/tag');

const router = Router();

/**
 * @route POST "/tag"
 */
router.post('/', async (req, res) => {
  let doc;
  try {
    doc = await Tag.create(req.body);
  } catch (e) {
    logger.error(e);
    return res.status(400).json(e);
  }

  logger.created('Tag', doc);
  return res.status(201).json(doc);
});

/**
 * @route GET "/tag"
 */
router.get('/', async (req, res) => {
  const docs = await Tag.find(req.query);
  logger.readMany('Tag', docs);
  return res.json(docs);
});

/**
 * @route GET "/tag"
 */
router.get('/:slug', async (req, res) => {
  const doc = await Tag.findOne({ slug: req.params.slug });
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found',
    });
  }

  logger.readOne('Tag', doc);
  return res.json(doc);
});

/**
 * @route GET "/tag/:slug"
 */
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  const doc = await Tag.findOne({
    slug,
  });
  if (!doc) {
    return res.status(404).json({
      msg: 'Not Found',
    });
  }

  logger.readOne('Tag', doc);
  return res.json(slug);
});

/**
 * @route DELETE "/tag/:slug"
 */
router.delete('/:slug', async (req, res) => {
  const { slug } = req.params;
  await Tag.deleteOne({
    slug,
  });

  logger.deleted('Tag', slug);
  return res.json({
    msg: 'ok',
  });
});

// -----

module.exports = router;
