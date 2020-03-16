const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a display name for tag'],
  },
  isSchool: {
    type: Boolean,
    default: false,
  },
  slug: {
    //* Alternate Versions for the tag, Eg Artificial Intelligence can be alt as AI or ai or A.I.
    type: String,
  },
});

TagSchema.pre('save', function(next) {
  const slug = this.name.replace(/\s/g, '').toLowerCase();
  this.slug = slug;
  next();
});

module.exports = mongoose.model('Tag', TagSchema);
