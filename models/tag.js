const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Please provide a display name for tag'],
  },
  isSchool: {
    type: Boolean,
    default: false,
  },
  slug: {
    //* Alternate Versions for the tag, Eg Artificial Intelligence can be alt as AI or ai or A.I.
    type: String,
    unique: true,
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const generateSlug = (name) => name.replace(/\s+/g, '-').toLowerCase();

TagSchema.pre('save', function addSlug(next) {
  console.log(this.getFilter());
  const slug = generateSlug(this.name);
  this.slug = slug;
  next();
});

TagSchema.pre('findOneAndUpdate', async function addSlug(next) {
  const name = this.get('name');
  if (!name) {
    next();
  }
  const slug = generateSlug(name);
  this.set({ slug });
  next();
});

module.exports = mongoose.model('Tag', TagSchema);
