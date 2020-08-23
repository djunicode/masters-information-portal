const Chat = require('../models/chat');
const logger = require('../config/logger');
const User = require('../models/user');

/**
 * @apiDefine Chat Chat
 * Developed by Heth
 */

/**
 * @apiGroup Chat
 * @api {POST} /api/chats/ Create new chat
 * @apiDescription Create new chat object
 * @apiPermission All logged in users with jwt token
 * @apiParam Sender ObjectID
 * @apiParam Receiver ObjectID
 * @apiParam Message Chat Messages
 * @apiSuccess (201) {ObjectId} _id Object Id of created object
 * @apiSuccess (201) {ObjectId} sender Object Id of the sender
 * @apiSuccess (201) {ObjectId} receiver Object Id of the receiver
 * @apiSuccess (201) {Array} messages Comprising of message and the respective receiver
 * @apiSuccess (201) {String} message The senders message
 * @apiSuccessExample Example data of success(201):
 * {
 *   sender:5e2efa2bdfae143a7cef8ed6,
 *   receiver:5e2efe9cb7dd5716846c0c62,
 *   messages:[{
 *    sender:5e2efa2bdfae143a7cef8ed6,
 *    message:'Hey there!'
 * }
 */
exports.create = async (req, res) => {
  const data = req.body;
  data.sender = req.user._id;

  const doc = await Chat.create(data);
  logger.created('Chat', doc);
  return res.status(201).json(doc);
};

/**
 * @apiGroup Chat
 * @api {GET} /api/chats/ Gets all the chats of the user from the db
 * @apiDescription Gets all the chats of the user from the database
 * @apiPermission All logged in users with jwt token
 * @apiSuccess (200) {Array} Array of all the chat objects of the user from the db
 */

exports.getChats = async (req, res) => {
  const userId = req.user._id;

  const sentChats = await Chat.find({ sender: userId }).populate('receiver', '-password');
  const sentChatsArray = sentChats.map((d) => ({
    ...d.toObject(),
    receiver: d.receiver.id,
    user: d.receiver,
  }));
  const receivedChats = await Chat.find({ receiver: userId }).populate('sender', '-password');
  const receivedChatsArray = receivedChats.map((d) => ({
    ...d.toObject(),
    sender: d.sender.id,
    user: d.sender,
  }));

  const chats = [...sentChatsArray, ...receivedChatsArray];

  if (chats.length === 0) {
    // Send 404 but empty chats
    return res.status(404).send([]);
  }

  return res.status(200).send(chats);
};
