const mongoose = require('mongoose');

/**
 * @typedef {Object} Tag
 * @property {string} name - Display name for tag
 * @property {Boolean} isSchool - represents if the tag represents an institute
 * @property {string} slug - A compressed version of name, in deelopement
 * @property {Array<ObjectId>} followers - Array of object Id's of followers
 * @property {function} pre_save - converts the name into slug
 */
const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Please provide a display name for tag']
  },
  isSchool: {
    type: Boolean,
    default: false
  },
  slug: {
    //* Alternate Versions for the Tag
    type: String,
    unique: true
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

const generateSlug = name => name.replace(/\s+/g, '-').toLowerCase();

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
