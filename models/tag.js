const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  //* Display Name for the tag, this is the name that should be displayed for the tag.
  name: {
    type: String,
    required: [true, 'Please Provide a Display Name for tag'],
  },

  isSchool: {
    type: Boolean,
    default: false,
  },
  //* Alternate Versions for the tag, Eg Artificial Intelligence can be alt as AI or ai or A.I.
  alt: {
    type: [String],
  },
});

//! NOTE : This is done this way becuase for some reason the deafult function was nto run for alt if given in schema ,
//! Also note that explicit function is used rather than arrow function, because arrow fn would get an empty object for 'this'
TagSchema.path('alt').default(function() {
  return [this.name.replace(/\s/g, '').toLowerCase()];
});

const Tag = mongoose.model('Tag', TagSchema);
module.exports = Tag;
