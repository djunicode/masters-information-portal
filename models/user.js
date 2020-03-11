'use strict';

const mongoose = require('mongoose');
const { encryptPassword } = require('../utils/encryption');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		graduationDate: {
			type: Date,
		},
		bio: {
			type: String,
		},
		currentSchool: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Tag',
		},
		accepts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Tag',
			},
		],
		rejects: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Tag',
			},
		],
		pinnedQuestions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Forum',
			},
		],
	},
	{ timestamps: true }
);

userSchema.pre('save', async function() {
  this.password = await encryptPassword(this.password);
});

module.exports = mongoose.model('User', userSchema);
