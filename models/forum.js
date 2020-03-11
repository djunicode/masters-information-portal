'use strict';

const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema(
	{
		title: String,
		text: String,
		poster: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		upvoters: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		downvoters: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],

		answers: [
			{
				text: String,
				createdAt: { type: Date, default: Date.now },
				updatedAt: { type: Date, default: Date.now },
				poster: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
				upvoters: [
					{
						type: mongoose.Schema.Types.ObjectId,
						ref: 'User',
					},
				],
				downvoters: [
					{
						type: mongoose.Schema.Types.ObjectId,
						ref: 'User',
					},
				],
				pinned: { type: Boolean, default: false },
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Forum', forumSchema);
