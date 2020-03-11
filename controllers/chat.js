'use strict';

// TODO: give appropriate names for controllers

const mongo = require('../models/chat');

let senderId;
let receiverId;

//why are we using name,senderId,recevierId,TWhom when we arent even storing it ??
//if we dont need them we can send them to get req block to avoid deadlock

module.exports = {
	chat: async (req, res, next) => {
		let name;
		let TWhom;
		// Finding from db if the user is present
		const sender = await mongo.User.findOne({ name: req.body.sender });
		const receiver = await mongo.User.findOne({ name: req.body.receiver });
		const messageSender = await mongo.Message.findOne({
			sender: sender._id,
			receiver: receiver._id,
		});
		const messageReceiver = await mongo.Message.findOne({
			sender: receiver._id,
			receiver: sender._id,
		});
		//here messageReceiver is actually a sender

		if (messageSender) {
			name = req.body.sender;
			TWhom = req.body.receiver;
			res.send(messageSender.message);
			senderId = sender._id;
			receiverId = receiver._id;
		} else if (messageReceiver) {
			name = req.body.receiver;
			TWhom = req.body.sender;
			res.send(messageReceiver.message);
			senderId = receiver._id;
			receiverId = sender._id;
		} else {
			const newUser = new mongo.Message({
				sender: await mongo.User.findOne({ name: req.body.sender }),
				receiver: await mongo.User.findOne({ name: req.body.receiver }),
			})
				.save()
				.then(data => {
					console.log(data);
					res.send(data);
				})
				.catch(e => console.log(e));
			name = req.body.sender;
			TWhom = req.body.receiver;
		}
	},

	ret: async (req, res, next) => {
		const data = await mongo.Message.findOne({
			sender: senderId,
			receiver: receiverId,
		});
		console.log(data.message);
		res.send(data.message);
	},
};
