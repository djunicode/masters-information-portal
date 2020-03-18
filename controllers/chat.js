const Chat = require('../models/chat');
const logger = require('../config/logger');

/**
 * @route POST "/api/chat"
 */
exports.create = async (req, res) => {
  const doc = await Chat.create(req.body);
  logger.created('Chat', doc);
  return res.status(201).json(doc);
};
