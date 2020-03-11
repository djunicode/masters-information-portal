'use strict';

// TODO: give appropriate names for controllers

const logger = require('../config/logger');
const Tag = require('../models/tag');

module.exports = {
	postTag: async (req, res, next) => {
		const doc = await Tag.create(req.body).catch(e => next(e));
		logger.created('Tag', doc);
		return res.status(201).json(doc);
	},

	getAllTags: async (req, res, next) => {
		const searchQuery = req.query;
		const docs = await Tag.find(searchQuery).catch(e => next(e));
		if (!docs) {
			return res.status(404).json({
				msg: 'No documents found',
			});
		}

		logger.readMany('Tag', docs);
		return res.json(docs);
	},

	getTag: async (req, res, next) => {
		const { slug } = req.params;
		const doc = await Tag.findOne({ slug }).catch(e => next(e));
		if (!doc) {
			return res.status(404).json({
				msg: 'Not found',
			});
		}

		logger.readOne('Tag', doc);
		return res.json(doc);
	},

	deleteTag: async (req, res, next) => {
		const { slug } = req.params;
		const doc = await Tag.findOneAndDelete({ slug }).catch(e => next(e));
		if (!doc) {
			return res.status(404).json({
				msg: 'Not found',
			});
		}

		logger.deleted('Tag', doc);
		return res.json({
			msg: 'ok',
		});
	},
};
