'use strict';

const router = require('express').Router();
const { postTag, getAllTags, getTag, deleteTag } = require('../controllers/tag');

// POST "/api/tag"
router.post('/', postTag);

// GET "/api/tag"
router.get('/', getAllTags);

//  GET "/api/tag/:slug"
router.get('/:slug', getTag);

//  DELETE "/api/tag/:slug"
router.delete('/:slug', deleteTag);

module.exports = router;
