const Chat = require('../models/chat');
const logger = require('../config/logger');

/**
 * @apiDefine Chat
 */



 /** 
 * @apiGroup Chat
 * @api {POST} /api/chats/
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
  const doc = await Chat.create(req.body);
  logger.created('Chat', doc);
  return res.status(201).json(doc);
};