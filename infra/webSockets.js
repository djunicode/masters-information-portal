const SocketIO = require('socket.io');
const http = require('http');
const logger = require('../config/logger');
const Chat = require('../models/chat');
const { verifyJwt } = require('./jwt');
const { createChatNotification } = require('./notifications');

/**
 * @apiDefine ChatSockets
 */

/**
 * @apigroup ChatSockets
 * @api {SocketIO} / Chat Socket.io
 * @apiDescription
 * You need to send the following events:
 * 1. authenticate - send JWT token for authentication
 * 2. open chat - send chat _id for joining a chatroom
 *
 * Following events are possible:
 *
 * 1. history - sends history of messages
 * 2. message - sends latest message sent to a chat
 * 3. status - gives status updates
 * 4. open chat success - sends the chat object which is openned
 */

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

    socket.on('authenticate', async (token) => {
      try {
        const decoded = await verifyJwt(token);
        socketUserMap[socket] = decoded._id;

        logger.info(`Authenticated ${socket.id}`);
        socket.emit('status', {
          code: 200,
          msg: 'Authenticated',
        });
      } catch (err) {
        logger.error(err);
        socket.emit('status', {
          code: 401,
          msg: 'User not authenticated',
          err,
        });
      }
    });

    socket.on('open chat', async (chatId) => {
      const chat = await Chat.findOne({ _id: chatId });

      if (!chat) {
        return socket.emit('status', {
          code: 400,
          msg: 'Chat not found',
        });
      }

      if (
        socketUserMap[socket] !== chat.sender.toString() &&
        socketUserMap[socket] !== chat.receiver.toString()
      ) {
        return socket.emit('status', {
          code: 403,
          msg: 'User not found in the chats',
        });
      }

      socket.join(chatId);
      socket.leave(socketChatMap[socket]);
      socketChatMap[socket] = chatId;

      socket.emit('open chat success', chatId);

      return socket.emit('history', chat.messages); // Sending in the old messages saved using the chatId in the db
    });

    socket.on('message', async (message) => {
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

      console.log('Received ', message);

      // Save message first
      const messageObject = {
        sender: socketUserMap[socket],
        message,
        time: new Date().toISOString(),
      };

      const chat = await Chat.findByIdAndUpdate(socketChatMap[socket], {
        $push: {
          messages: messageObject,
        },
      });

      const notification = createChatNotification(
        socketUserMap[socket],
        chat.receiver,
        socketChatMap[socket]
      );
      logger.created('Notification', notification);

      // Send to connected user(s)
      io.to(socketChatMap[socket]).emit('message', messageObject);
    });

    socket.on('disconnect', () => {
      // Delete user and chat info from cache table
      delete socketUserMap[socket];
      delete socketChatMap[socket];
    });
  });

  return server;
}

module.exports = createServer;
