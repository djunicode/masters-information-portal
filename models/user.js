const mongoose = require('mongoose');
const validator = require('validator');
const { encrypt } = require('../infra/encryption');
const { createJwt } = require('../infra/jwt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is Invalid');
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (value.length <= 7) {
        throw new Error('Password is too short!');
      }
    }
  },
  graduationDate: {
    type: Date
  },
  bio: {
    type: String
  },
  currentSchool: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  },
  accepts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  rejects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  pinnedQuestions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Forum',
  }],
  githubUrl: {
    type: String,
  },
  facebookUrl: {
    type: String,
  },
  linkedinUrl: {
    type: String,
  },
  twitterUrl: {
    type: String,
  },
  avatar : {
    type : Buffer
  },
  department: {
    type: String,
  },
  timeline : [{
    name :  String,
    date : Date,
    score : Number
  }],
  domains: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  role:[String]
});

userSchema.methods.newAuthToken = async function(){
  const user = this;
  const token = await createJwt({ _id: user.id});
  return token;
};

userSchema.methods.getPublicProfile = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.avatar;
  return userObject;
};

/**
 * Hashing password before save
 */
userSchema.pre('save', async function encrptPassword(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await encrypt(user.password);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;