const jwt = require('jsonwebtoken');
const { jwtSecret,jwtRefreshSecret } = require('../config/constants');

exports.createJwt = async obj => {
	return jwt.sign(obj, jwtSecret, { expiresIn: 86400 });
};

exports.createRefreshToken = async obj => {
	return jwt.sign(obj, jwtRefreshSecret, { expiresIn: 86400 * 7 });
};

exports.verifyJwt = async token => {
	try{
		return jwt.verify(token, jwtSecret);
	}catch(e){
		return null
	}
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
