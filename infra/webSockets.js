  /**
 * SocketIO events
 * authenticate ~ To join open user's chats
 * open chat ~ To send messages and get previous messages of the chat
 * message ~ To message on the chat
 */

const SocketIO = require('socket.io');
const http = require('http');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const Chat = require('../models/chat');
const { verifyJwt } = require('./jwt');
const { createChatNotification}=require('./notifications');

function createServer(app) {
  const server = http.Server(app);
  const io = SocketIO(server);

  // Socket-chats mapper
  const socketChatMap = {};
  // Socket-user mapper
  const socketUserMap = {};

  // On intitialising a socket connection
  io.on('connection', (socket) => {
    logger.info(`Socket ${socket.id} connected`);

    /**
     * @apiDefine WebSockets
     */

    /**
     * @apiGroup WebSockets
     * @api {WS} /authenticate User Authentication
     * @apiDescription User Verification using the allotted JWT token during login
     * Authorized users shall proceed forward to chatting
     */
    socket.on('authenticate', async (token) => {
      try {
        const decoded = await verifyJwt(token);
        console.log('dec', decoded);
        socketUserMap[socket] = decoded._id;
        console.log(socketUserMap[socket]);
      } catch (err) {
        console.log('error', err);
        socket.emit('status', {
          code: 401,
          msg: 'User not authenticated',
          err,
        });
      }
    });

    /**
     * @apiGroup WebSockets
     * @api {WS} open_chat Joining the user to resp chat room
     * @apiDescription After authentication based on the unique chat_id exclusively 
     * provided to a pair of private chat user is searched in the db
     * If the chat is retrieved user shall successfully enter a room with unique chat_id 
     * /
     /** 
     * @apiGroup WebSockets
     * @api {WS} msg_hist Providing the old chats 
     * @apiDescription Once user successfully enters a chat room then the socket shall
     * send back the prior old chat messages(if any) via this socket call
     */
    socket.on('open chat', async (chatId) => {
      console.log(chatId);
      const chat = await Chat.findOne({ _id: chatId });
      console.log(chat);
      if (!chat) {
        return socket.emit('status', {
          code: 400,
          msg: 'Chat not found',
        });
      }
      if (socketUserMap[socket] != chat.sender && socketUserMap[socket] != chat.receiver) {
        return socket.emit('status', {
          code: 403,
          msg: 'User not found in the chats',
        });
      }

      socket.join(chatId);
      socket.leave(socketChatMap[socket]);
      socketChatMap[socket] = chatId;
      console.log('chat msgs', chat.messages);
      socket.emit('msg hist', chat.messages); // Sending in the old messages saved using the chatId in the db
    });

    /**
     * @apiGroup WebSockets
     * @api {WS} message For sending message for live chat
     * @apiDescription It basically sends the messages sent by user1 to the server to be saved in the db and also
     * send the same chat msg to user2 to enable live chat
     */
    socket.on('message', async (message) => {
      console.log(message);
      // Unauthenticated
      if (!socketUserMap[socket]) {
        socket.emit('status', {
          code: 403,
          msg: 'User not authenticated',
        });
      }

      // No chat openned
      if (!socketChatMap[socket]) {
        socket.emit('status', {
          code: 400,
          msg: 'No chat openned',
        });
      }

      // Save message first
      await Chat.findByIdAndUpdate(socketChatMap[socket], {
        $push: {
          messages: {
            sender: socketUserMap[socket],
            message,
          },
        },
      }
      );
      const chat = await Chat.findById(socketChatMap[socket]);
      let latestMessage=chat.messages.slice(-1).pop()

      const notification=createChatNotification(socketUserMap[socket],chat.receiver,socketChatMap[socket]);
      logger.created('Notification', notification);
      // Send to connected user(s)
      io.to(socketChatMap[socket]).emit('message', latestMessage);
    });
    /**
     * @apiGroup WebSockets
     * @api {WS} disconnect Closing the socket connection
     * @apiDescription On this socket call the socket connection shall be terminated.
     * basically the array contents are deleted to again enable chat with different user in future.
     */
    socket.on('disconnect', () => {
      // Delete user and chat info from cache table
      delete socketUserMap[socket];
      delete socketChatMap[socket];
    });
  });

  return server;
}

module.exports = createServer;
