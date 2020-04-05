const Chat = require('../models/chat');
const logger = require('../config/logger');


 /** 
 * @api {POST} /api/chats/
 * @apiGroup Chat
 * @apiDescription Create new chat object
 * @apiPermission All logged in users with jwt token 
 * @apiParam 1)Sender(Mongoose obj id) 2)Receiver(Obj id) 3)Message(Chat msg)
 * @apiMiddleware JWT token authetication of the sender
 * @apiSuccess (201) New chat object is created using the info in body of the post request 
 * @apiSuccessExample Example data of success(201):
 * {
 *   sender:5e2efa2bdfae143a7cef8ed6,   //Object id(Mongoose id)
 *   receiver:5e2efe9cb7dd5716846c0c62,  //Object id(Mongoose id)
 *   messages:[{
 *    sender:5e2efa2bdfae143a7cef8ed6,    //Object id os the sender
 *    message:'Hey there!'                 //The chat message 
 *   }]
 * }
 */
exports.create = async (req, res) => {
  const doc = await Chat.create(req.body);
  logger.created('Chat', doc);
  return res.status(201).json(doc);
};