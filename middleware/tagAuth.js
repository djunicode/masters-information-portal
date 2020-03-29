const Tag = require('../models/tag');

const isTagOwner = async (req, res, next) => {
  const {slug} = req.params;
    const tag = await Tag.findOne({slug});
  if (!tag) {
    return res.status(400).json({
      msg: 'Tag not found'
    });
  }
  console.log(tag);
  if (req.user._id != tag.author.toString()) {
    return res.status(403).json({
      msg: 'Unauthoried'
    });
  }
  return next();
};

module.exports = { isTagOwner };