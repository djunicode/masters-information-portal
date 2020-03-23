const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Forum',
    default: null,
    validate: {
      validator: function(id) {
        if (this.isAnswer && !id) {
          return false;
        } else {
          return true;
        }
      },
      message: 'parentId is reuired for an answers'
    }
  },
  title: {
    type: String,
    required: true
  },
  text: { type: String, required: true },
  isAnswer: { type: Boolean, required: true, default: false },
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
