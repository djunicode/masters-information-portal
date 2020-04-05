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
  /**
   * Enabling io connection using http server
   */
  const server = http.Server(app);
  const io = SocketIO(server);

  // Socket-chats mapper
  const socketChatMap = {};
  // Socket-user mapper
  const socketUserMap = {};

  //On intitialising a socket connection
  io.on('connection', (socket) => {
    logger.info(`Socket ${socket.id} connected`);

    /**
     * @apiRoute WebSockets/authenticate
     * @apiDescription User Verification using the allotted JWT token during login
     * Authorized users shall proceed forward to chatting 
     */
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

    /**
     * @apiRoute WebSockets/open chat
     * @apiDescription After authentication based on the unique chat_id exclusively 
     * provided to a pair of private chat user is searched in the db
     * If the chat is retrieved user shall successfully enter a room with unique chat_id 
     * @apiRoute WebSocket/msg hist
     * @apiDescription Once user successfully enters a chat room then the socket shall
     * send back the prior old chat messages(if any) via this socket call
     */
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
      socket.emit('msg hist',chat.messages);//Sending in the old messages saved using the chatId in the db
    });


    /**
     * @apiRoute WebSockets/message
     * @apiDescritpion This socket call shall enable live chat application between the two users
     * On the 'message' socket call the messages sent by the user1 to user2 shall be fetched 
     * and stored in the database of the chat schema
     * It will basically check if the user is authenticated and then if the chat_id exists in the db
     * If the chat object exists then the user message shall be stored in the db successfully 
     * And at the same time it shall deploy another socket call to send the msg to the user2
     * This facility enables live chatting
     */
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
            message
          },
        },
      });
  
      // Send to connected user(s)
      io.to(socketChatMap[socket]).send('message', message);
    });
  /**
   * @apiRoute WebSockets/disconnect
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
