const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  //* Display Name for the tag, this is the name that should be displayed for the tag.
  name: {
    type: String,
    required: [true, 'Please provide a display name for tag'],
  },

  isSchool: {
    type: Boolean,
    default: false,
  },

  //* Alternate Versions for the tag, Eg Artificial Intelligence can be alt as AI or ai or A.I.
  slug: {
    type: String,
  },
});

TagSchema.pre('save', function(next) {
  const slug = this.name.replace(/\s/g, '').toLowerCase();
  this.slug = slug;
  next();
});

const Tag = mongoose.model('Tag', TagSchema);
module.exports = Tag;
