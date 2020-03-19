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
const { verifyJwt } = require("./jwt");

function createServer(app) {
  const server = http.Server(app);
  const io = SocketIO(server);

  // Socket-chats mapper
  const socketChatMap = {};
  // Socket-user mapper
  const socketUserMap = {};

  io.on('connection', (socket) => {
    logger.info(`Socket ${socket.id} connected`);

    socket.on('authenticate', async (token) => {
      try {
        const decoded = await verifyJwt(token);
        console.log("dec",decoded)
        socketUserMap[socket] = decoded._id;
        console.log(socketUserMap[socket])
      } catch(err) {
        console.log("error",err)
        socket.emit('status', {
          code: 401,
          msg: 'User not authenticated',
          err,
        });
      }
    })

    socket.on('open chat', async (chatId) => {
      console.log(chatId)
      const chat =await Chat.findOne({_id:chatId});
      console.log(chat)
      if(!chat){
        return socket.emit('status',{
          code:400,
          msg:'Chat not found'
        }) 
      }
      if (socketUserMap[socket]!=chat.sender&&socketUserMap[socket]!=chat.receiver){
        return socket.emit('status', {
          code: 403,
          msg: 'User not found in the chats',
         }); 
      }
  
      socket.join(chatId);
      socketChatMap[socket] = chatId;
      console.log('chat msgs' ,chat.messages) 
      socket.emit('msg hist',chat.messages);
    });

    socket.on('message', async (message) => {
      console.log(message)
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
