const Chat = require('../models/chat');
const logger = require('../config/logger');

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
  const doc = await Chat.create(req.body);
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
exports.getChats=async(req,res)=>{
  let data=[];
  const userId=res.locals.user._id;
  const doc=await Chat.find({sender:userId}).populate('receiver');
  doc.forEach(element => {
    data.append(element);
  });

  const docList=await Chat.find({receiver:userId}).populate('sender');
  docList.forEach(element => {
    data.append(element);
  });

  if(data==null){
    return res.status(400).send({
      success:false,
      msg:'No chats found in the db'
    })
  }

  return res.status(200).send(data);

}