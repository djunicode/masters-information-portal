const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/constants');

exports.createJwt = async obj => {
	return jwt.sign(obj, jwtSecret, { expiresIn: 86400 * 15 });
};

exports.verifyJwt = async token => {
	return jwt.verify(token, jwtSecret);
};

exports.extractJwt = req => {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(' ')[0] === 'Bearer'
	) {
		return req.headers.authorization.split(' ')[1];
	}
	return false;
};
