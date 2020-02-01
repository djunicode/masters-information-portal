const express = require('express');
const Tag = require('../models/tag');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const temp = await Tag.create(req.body);
    res.status(201).send({ tag: temp });
  } catch (e) {
    // Mongoose Error code
    if (e.code === 11000) {
      res.status(400).send({ err: e });
    } else {
      res.status(500).send({ err: 'Server Error' });
    }
  }
});

module.exports = router;
