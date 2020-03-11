'use strict';

// TODO: make sense out of the websocket code

const socket = require('socket.io');
const mongo = require('../models/chat');
const io = socket(server);

// Socket Code
io.on('connection', socket => {
	console.log(`connection made with socket id-${socket.id}`);
	// Socket to join a room with this name
	socket.join(`${name} ${toWhom}`);
	// Saving that room as sockets room
	socket.room = `${name} ${toWhom}`;
	console.log(socket.room);
	io.to(`${name} ${toWhom}`).emit(
		'updatechat',
		`${name} has connected to this room`
	);

	// During Chats
	socket.on('chat', async data => {
		const arr = socket.room.split(' ');
		console.log(arr);
		// Finding both users from db
		const obj = await mongo.User.findOne({ name: arr[0] });
		const obj1 = await mongo.User.findOne({ name: arr[1] });

		console.log(obj);
		// Appending the chats
		mongo.Message.updateOne(
			{ initiator: obj._id, to: obj1._id },
			{
				$push: {
					message: { handle: `${data.handle}`, msg: `${data.message}` },
				},
			},
			function(err, numAffected, rawResponse) {
				console.log(err);
				console.log('The number of updated documents was %d', numAffected);
				console.log('The raw response from Mongo was ', rawResponse);
			}
		);
		// Emmiting to all sockets in the room in our case will be one to one chat
		// i.e Private chat
		io.to(socket.room).emit('chat', data);
	});
});
