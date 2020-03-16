const Chat = require('../models/chat');
const logger = require('../config/logger');
const auth=require('../middleware/auth');
const express=require('express');

const router = express.Router();
/**
 * @route POST "/api/chat"
 */
router.post('/',auth,create);

exports.create = async (req, res) => {
  const doc = await Chat.create(req.body);
  logger.created('Chat', doc);
  return res.status(201).json(doc);
};