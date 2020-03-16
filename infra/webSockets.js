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
const jwtVer=require("./jwt");

function createServer(app) {
  const server = http.Server(app);
  const io = SocketIO(server);

  // Socket-chats mapper
  const socketChatMap = {};
  // Socket-user mapper
  const socketUserMap = {};

  io.on('connection', (socket) => {
    logger.info(`Socket ${socket.id} connected`);

    // TODO: Check user's tokens to check if token is valid
    socket.on('authenticate', (token) => {
      if(!jwtVer.verifyJwt(token)){
        socket.send('status', {
          code: 403,
          msg: 'User not authenticated',
        });
      }
      else{
        const user = jwt.decode(token);
        socketUserMap[socket] = user._id;
      }
    });

    // TODO: Check if chat exists, and if user belongs to that chat
    // Note that user should be authenticated
    socket.on('open chat', (chatId) => {
      const chat=Chat.findOne({_id:chatId});
      if(!chat){
        socket.send('status',{
          code:'400',
          msg:'Chat not found'
        })
      }
      else{
        if (socketUserMap[socket]==chat.sender||socketUserMap[socket]==chat.receiver) {
          socket.join(chatId);
          socketChatMap[socket] = chatId;   
          socket.send('msgs',chat.messages) 
        }
        else{         
          socket.send('status', {
            code: 403,
            msg: 'User not found in the chats',
          });   
        }
      }

    });

    socket.on('message', async (message) => {
      // Unauthenticated
      if (!socketUserMap[socket]) {
        socket.send('status', {
          code: 403,
          msg: 'User not authenticated',
        });
      }

      // No chat openned
      if (!socketChatMap[socket]) {
        socket.send('status', {
          code: 400,
          msg: 'No chat openned',
        });
      }

      // Save message first
      await Chat.findByIdAndUpdate(socketChatMap[socket], {
        $push: {
          messages: { 
            sender: socket.userId,
            message,
          },
        },
      });

      // Send to connected user(s)
      io.to(socketChatMap[socket]).send('message', message);
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
