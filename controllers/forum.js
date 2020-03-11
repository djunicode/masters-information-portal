'use strict';

// TODO: give appropriate names for controllers

const Forum = require('../models/forum');
const logger = require('../config/logger');

module.exports = {
	findAll: async (req, res, next) => {
		try {
			logger.info('Getting forum posts');
			let allForums = await Forum.find(req.query);
			return res.send(allForums);
		} catch (err) {
			next(err);
		}
	},

	create: async (req, res, next) => {
		try {
			logger.info('Creating forum post');
			let newForum = await Forum.create(req.body);
			return res.json(newForum);
		} catch (err) {
			next(err);
		}
	},

	findById: async (req, res, next) => {
		try {
			logger.info('Get forum post info by id..');
			let foundForum = await Forum.findById(req.params.id);
			return res.json(foundForum);
		} catch (err) {
			next(err);
		}
	},

	update: async (req, res, next) => {
		try {
			logger.info('Updating forum post');
			let forum = await Forum.findByIdAndUpdate(req.params.id, req.body);
			return res.json(forum);
		} catch (err) {
			next(err);
		}
	},

	destroy: async (req, req, next) => {
		logger.info('Deleting forum post');
		Forum.findByIdAndDelete(req.params.id, error => {
			if (error) {
				next(error);
			} else {
				res.redirect('/api/forum');
			}
		});
	},
};
