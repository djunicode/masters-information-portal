'use strict';

const mongoose = require('mongoose');

const messageSchema = new Schema(
	{
		//initiator
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		//to
		receiver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		message: [
			{
				// Handle is the Senders name and msg is the actual message
				//updated to sender
				sender: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
				messageBody: String,
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
