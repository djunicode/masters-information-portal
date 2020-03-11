'use strict';

const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please provide a display name for tag.'],
		},
		isSchool: {
			type: Boolean,
			default: false,
		},
		//* Alternate Versions for the tag, Eg Artificial Intelligence can be alt as AI or ai or A.I.
		slug: {
			type: String,
		},
	},
	{ timestamps: true }
);

tagSchema.pre('save', function(next) {
	const slug = this.name.replace(/\s/g, '').toLowerCase();
	this.slug = slug;
	next();
});

module.exports = mongoose.model('Tag', tagSchema);
