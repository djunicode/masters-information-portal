const Tag = require('../models/tag');
const logger = require('../config/logger');

/**
 * @apiDefine Tag Tag
 * Developed by Jay and Yashodhan
 */

/**
 * @apiGroup Tag
 * @api {POST} /api/tag Create new Tag
 * @apiDescription Creates a new Tag
 * @apiPermission Admin
 * @apiParam {String} name Display name of tag
 * @apiParam {Boolean} isSchool=false Whether the tag belongs to an Institute
 * @apiSuccess (201) {ObjectId} _id Object Id of created object
 * @apiSuccess (201) {String} name Display name of tag
 * @apiSuccess (201) {Boolean} isSchool Whether the tag belongs to an Institute
 * @apiSuccess (201) {String} slug Compressd version of name <Currently under developemant>
 * @apiSuccess (201) {Array} followers Empty array
 */
exports.create = async (req, res) => {
  const doc = await Tag.create(req.body);
  logger.created('Tag', doc);
  return res.status(201).json(doc);
};
/**
 * @apiGroup Tag
 * @api {GET} /api/tag Get all Tags
 * @apiDescription Get all Tags in database
 * @apiPermission None
 * @apiSuccess (200) {Tag[]} no_field Array of tags, where each tag contains :
 * @apiSuccess (200) {ObjectId} _id Object Id of created object
 * @apiSuccess (200) {String} name Display name of tag
 * @apiSuccess (200) {Boolean} isSchool Whether the tag belongs to an Institute
 * @apiSuccess (200) {String} slug Compressd version of name <Currently under developemant>
 * @apiSuccess (200) {Array} followers Array of ObjectIds' of following Users
 */
exports.getAll = async (req, res) => {
  const searchQuery = req.query;
  const docs = await Tag.find(searchQuery);
  if (!docs) {
    return res.status(404).json({
      msg: 'No documents found',
    });
  }

  logger.readMany('Tag', docs);
  return res.json(docs);
};

/**
 * @apiGroup Tag
 * @api {GET} /api/tag/:slug Get a Tag by slug
 * @apiDescription Get Tag by its slug
 * @apiPermission None
 * @apiSuccess (200) {ObjectId} _id Object Id of created object
 * @apiSuccess (200) {String} name Display name of tag
 * @apiSuccess (200) {Boolean} isSchool Whether the tag belongs to an Institute
 * @apiSuccess (200) {String} slug Compressd version of name <Currently under developemant>
 * @apiSuccess (200) {Array}  followers Array of ObjectIds' of following Users
 *
 */
exports.getBySlug = async (req, res) => {
  const { slug } = req.params;
  const doc = await Tag.findOne({ slug });
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found',
    });
  }

  logger.readOne('Tag', doc);
  return res.json(doc);
};

/**
 * @apiGroup Tag
 * @api {PUT} /api/tag/:slug Update a Tag
 * @apiDescription Update Tag by its slug
 * @apiPermission Admin
 * @apiParam {String} [name] Display name of tag
 * @apiParam {Boolean} [isSchool] Whether the tag belongs to an Institute
 * @apiParam {String} [slug] Compact Version of name \<Should not be Given,ideally\>
 * @apiSuccess (200) {ObjectId} _id Object Id of created object
 * @apiSuccess (200) {String} name Display name of tag
 * @apiSuccess (200) {Boolean} isSchool Whether the tag belongs to an Institute
 * @apiSuccess (200) {String} slug Compressd version of name <Currently under developemant>
 * @apiSuccess (200) {Array}  followers Array of ObjectIds' of following Users
 */
exports.updateBySlug = async (req, res) => {
  const { slug } = req.params;
  const doc = await Tag.findOneAndUpdate({ slug }, req.body, { new: true });
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found',
    });
  }
  logger.updated('Tag', doc);
  return res.json(doc);
};

/**
 * @apiGroup Tag
 * @api {DELETE} /api/tag/:slug Delete Tag by slug
 * @apiDescription Delete a Tag by its slug
 * @apiPermission Admin
 * @apiSuccess (200) {String} msg Contains value "ok"
 */
exports.deleteBySlug = async (req, res) => {
  const { slug } = req.params;
  const doc = await Tag.findOneAndDelete({ slug });
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found',
    });
  }

  logger.deleted('Tag', doc);
  return res.json({
    msg: 'ok',
  });
};

/**
 * @apiGroup Tag
 * @api {POST} /api/tag/:slug/follow Follow a Tag
 * @apiDescription Request to follow a Tag
 * @apiPermission LoggedIn
 * @apiSuccess (200) {ObjectId} _id Object Id of created object
 * @apiSuccess (200) {String} name Display name of tag
 * @apiSuccess (200) {Boolean} isSchool Whether the tag belongs to an Institute
 * @apiSuccess (200) {String} slug Compressd version of name <Currently under developemant>
 * @apiSuccess (200) {Array}  followers Array of ObjectIds' of following Users
 *
 */
exports.follow = async (req, res) => {
  const { slug } = req.params;
  const doc = await Tag.findOne({ slug });
  // Checking if tag exists
  if (doc === null) {
    return res.status(404).json({
      msg: 'Tag Not found',
    });
  }
  // Checking if user aldready follows the tag
  if (doc.followers.includes(req.user.id)) {
    return res.status(403).json({
      msg: 'You aldready follow this tag',
    });
  }
  doc.followers.push(req.user._id);
  await doc.save();
  req.user.tagFollows.push(doc._id);
  await req.user.save();
  return res.json(doc);
};

/**
 * @apiGroup Tag
 * @api {POST} /api/tag/:slug/unfollow unfollow a Tag
 * @apiDescription Request to unfollow a Tag
 * @apiPermission LoggedIn
 * @apiSuccess (200) {ObjectId} _id Object Id of created object
 * @apiSuccess (200) {String} name Display name of tag
 * @apiSuccess (200) {Boolean} isSchool Whether the tag belongs to an Institute
 * @apiSuccess (200) {String} slug Compressd version of name <Currently under developemant>
 * @apiSuccess (200) {Array}  followers Array of ObjectIds' of following Users
 */
exports.unfollow = async (req, res) => {
  const { slug } = req.params;
  // Checking if tag exists
  const doc = await Tag.findOne({ slug });
  if (doc === null) {
    return res.status(404).json({
      msg: 'Tag Not found',
    });
  }
  // Checking if user does not follow the tag
  if (!doc.followers.includes(req.user.id)) {
    return res.status(403).json({
      msg: "You don't follow this tag",
    });
  }
  // Removing user from followers array of the tag
  doc.followers.splice(doc.followers.indexOf(req.user.id), 1);
  // Removing the tag from the tagFollows array of the user
  req.user.tagFollows.splice(req.user.tagFollows.indexOf(doc.id, 1));

  await doc.save();
  await req.user.save();
  return res.json(doc);
};
