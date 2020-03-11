'use strict';

const bcrypt = require('bcryptjs');
const { saltRounds } = require('../config/constants');

exports.encryptPassword = async plainTextPassword => {
	return bcrypt.hash(plainTextPassword, saltRounds);
};

exports.comparePassword = async (inputPassword, hashedPassword) => {
	return bcrypt.compare(inputPassword, hashedPassword);
};
