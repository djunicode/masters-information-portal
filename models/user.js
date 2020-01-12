const mongoose = require('mongoose');

// Note: This is rough, needs to be edited later.

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  name: String,
  sap_id: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
