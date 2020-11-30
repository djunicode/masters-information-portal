const bcrypt = require('bcryptjs');
const { saltRounds } = require('../config/constants');

exports.encrypt = async (plainTextPassword) => {
  return bcrypt.hash(plainTextPassword, saltRounds);
};

exports.comparePassword = async (inputPassword, hashedPassword) => {
  return bcrypt.compare(inputPassword, hashedPassword);
};
