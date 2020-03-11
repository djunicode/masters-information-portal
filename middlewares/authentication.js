'use strict';

const User = require('../models/user');
const { verifyJwt, extractJwt } = require('../utils/utils');

const verifyAuthentication = async (req, res, next) => {
	let payload;
	const token = extractJwt(req);

	if (!token) {
		return res.status(400).send({
			error: {
				status: res.statusCode,
				message: 'No JWT provided',
			},
		});
	}

	try {
		payload = await verifyJwt(token);
	} catch (error) {
		return next(error);
	}

	const existingUser = await User.findOne({ _id: payload._id });

	if (!existingUser) {
		return res.status(404).send({
			error: {
				status: res.statusCode,
				message: 'User does not exist',
			},
		});
	}
	res.locals.user = existingUser;
	next();
};

module.exports = verifyAuthentication;