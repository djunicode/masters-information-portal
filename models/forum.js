const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Forum',
    default: null,
    validate: {
      validator: function(id) {
        return !this.isAnswer || !!id;
      },
      message: 'parentId is reuired for an answers',
      type: 'required',
      kind: 'required'
    }
  },
  isAnswer: { type: Boolean, required: true, default: false },
  title: {
    type: String,
    default: '',
    validate: {
      validator: function(val) {
        return this.isAnswer || !!val;
      },
      message: 'Title is required for questions',
      type: 'required',
      kind: 'required'
    }
  },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Forum' }],
  upvoters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  downvoters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag'
    }
  ]
});

module.exports = mongoose.model('Forum', forumSchema);
