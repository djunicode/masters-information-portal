const Forum = require('../models/forum');
const User = require('../models/user');
const Tag=require("../models/tag")
const logger = require('../config/logger');

/**
 * @apiGroup Forum
 * @api {POST} /api/forum
 * @apiDescription Post a Forum
 * @apiPermission isLoggedIn
 * @apiParam None
 * @apiSuccess (201) {ObjectID} parentId -Id of the corresponding Forum (if the current document is an answer)
 * @apiSuccess (201) {Boolean} isAnswer -Whether it is an answer or a question
 * @apiSuccess (201) {String} title -Title of the forum (if the current document is a question)
 * @apiSuccess (201) {String} text -Textbody of the forum/Answers (depending on isAnswer)
 * @apiSuccess (201) {Date} createdAt -Time at which the forum was created
 * @apiSuccess (201) {Date} updatedAt -Time at which the forum was updated
 * @apiSuccess (201) {ObjectID} author -The author of the forum
 * @apiSuccess (201) {Array} upvoters -Array of objectIds of upvoters
 * @apiSuccess (201) {Array} downvoters -Array of objectIds of downvoters
 * @apiSuccess (201) {Array} tags - Array of objectIds of Tags
 * @apiSuccess (201) {Array} answers - Array of objectIds of Answers
 */
exports.create = async (req, res) => {
  const doc = await Forum.create(req.body);
  if (req.body.isAnswer) {
    const forum = await Forum.findByIdAndUpdate(req.body.parentId, { $push: { answers: doc._id } });
    logger.info(
      `Created answer ${doc._id} to question ${forum._id} posted by user ${req.body.author}`
    );
  }

  logger.created('Forum', doc);
  return res.status(201).json(doc);
};

/**
 * @apiGroup Forum
 * @api {GET} /api/forum?slugs[]=node&title=xyz
 * @apiDescription Get all Forums in db
 * @apiPermission isLoggedIn
 * @apiParam slugs: [String], array of tag slugs and title 
 * @apiSuccess (200) {ObjectID} parentId -Id of the corresponding Forum (if the current document is an answer)
 * @apiSuccess (200) {Boolean} isAnswer -Whether it is an answer or a question
 * @apiSuccess (200) {String} title -Title of the forum (if the current document is a question)
 * @apiSuccess (200) {String} text -Textbody of the forum/Answers (depending on isAnswer)
 * @apiSuccess (200) {Date} createdAt -Time at which the forum was created
 * @apiSuccess (200) {Date} updatedAt -Time at which the forum was updated
 * @apiSuccess (200) {ObjectID} author -The author of the forum
 * @apiSuccess (200) {Array} upvoters -Array of objectIds of upvoters
 * @apiSuccess (200) {Array} downvoters -Array of objectIds of downvoters
 * @apiSuccess (200) {Array} tags - Array of objectIds of Tags
 * @apiSuccess (200) {Array} answers - Array of objectIds of Answers
 */
exports.getAll = async (req, res) => {
  let queryFilter = req.query;

  if(queryFilter.slugs) {
    const { slugs } = queryFilter;
    const tags_id = await Tag.find({ slug: { $in:slugs } }).select({ _id:1 });
    delete queryFilter.slugs;
    queryFilter.tags = { $in: tags_id };
  }
  if(queryFilter.search){
    const { search }=queryFilter
    queryFilter={$text:{$search:search}}
  }
  
  const docs = await Forum.find(queryFilter)
  if (!docs) {
    return res.status(404).json({
      msg: 'No documents found'
    });
  }
  
  logger.readMany('Forum', docs);
  return res.json(docs);
};

/**
 * @apiGroup Forum
 * @api {GET} /api/forum/:id
 * @apiDescription Get a Forum by its id
 * @apiPermission None
 * @apiParam id of the Forum
 * @apiSuccess (200) {ObjectID} parentId -Id of the corresponding Forum
 * @apiSuccess (200) {Boolean} isAnswer -Whether it is an answer
 * @apiSuccess (200) {String} title -Title of the forum
 * @apiSuccess (200) {String} text -Textbody of the forum/Answers
 * @apiSuccess (200) {Date} createdAt -Time at which the forum was created
 * @apiSuccess (200) {Date} updatedAt -Time at which the forum was updated
 * @apiSuccess (200) {ObjectID} author -The author of the forum
 * @apiSuccess (200) {Array} upvoters -Array of objectIds of upvoters
 * @apiSuccess (200) {Array} downvoters -Array of objectIds of downvoters
 * @apiSuccess (200) {Array} tags - Array of objectIds of Tags
 * @apiSuccess (200) {Array} answers - Array of objectIds of Answers
 */
exports.getById = async (req, res) => {
  const { id } = req.params;
  const doc = await Forum.findById(id);
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found'
    });
  }

  logger.readOne('Forum', doc);
  return res.json(doc);
};

/**
 * @apiGroup Forum
 * @api {POST} /api/forum/:id/upvote
 * @apiDescription Upvote a Forum by its id
 * @apiPermission isLoggedIn
 * @apiParam id of the forum
 * @apiSuccess (201) {String} empty object
 */
exports.upvoteById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const doc = await Forum.findById(id);
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found'
    });
  }
  //* User has already upvoted it
  if (doc.upvoters.includes(userId)) {
    return res.status(409).send({
      msg: 'Cannot upvote more than once.'
    });
  }
  //* User has already downvoted it
  if (doc.downvoters.includes(userId)) {
    await Forum.findByIdAndUpdate(id, { $pull: { downvoters: userId } });
    logger.info(`Forum Question ${id} removed downvote by ${userId}`);
    return res.status(200).send({});
  }

  //* User has not reacted at all
  await Forum.findByIdAndUpdate(id, { $push: { upvoters: userId } });
  logger.info(`Forum Question ${id} upvoted by ${userId}`);
  return res.status(201).send({});
};

/**
 * @apiGroup Forum
 * @api {POST} /api/forum/:id/downvote
 * @apiDescription Downvote a Forum by its id
 * @apiPermission isLoggedIn
 * @apiParam id of the forum
 * @apiSuccess (201) {String} empty object
 */
exports.downvoteById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const doc = await Forum.findById(id);
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found'
    });
  }
  if (doc.downvoters.includes(userId)) {
    return res.status(409).send({
      msg: 'Cannot downvote more than once.'
    });
  }
  //* User has already upvoted it
  if (doc.upvoters.includes(userId)) {
    await Forum.findByIdAndUpdate(id, { $pull: { upvoters: userId } });
    logger.info(`Forum Question ${id} removed upvote by ${userId}`);
    return res.status(200).send({});
  }
  await Forum.findByIdAndUpdate(id, { $push: { downvoters: userId } });
  logger.info(`Forum Question ${id} downvoted by ${userId}`);
  return res.status(201).send({});
};

/**
 * @apiGroup Forum
 * @api {POST} /api/forum/:id/pin
 * @apiDescription Pin a Forum by its id
 * @apiPermission isLoggedIn
 * @apiParam id of the forum
 * @apiSuccess (201) {String} empty object
 */
exports.pinById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  if (req.user.pinnedQuestions.includes(id)) {
    return res.status(409).send({
      msg: 'Already pinned question'
    });
  }
  const doc = await Forum.findById(id);
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found'
    });
  }
  await User.findByIdAndUpdate(userId, { $push: { pinnedQuestions: id } });
  logger.info(`Forum Question ${id} pinned by ${userId}`);
  return res.status(201).send({});
};

/**
 * @apiGroup Forum
 * @api {PUT} /api/forum/:id
 * @apiDescription Update a Forum by its id
 * @apiPermission LoggedIn and isOwner
 * @apiParam id of the Forum
 * @apiSuccess (200) {ObjectID} parentId -Id of the corresponding Forum
 * @apiSuccess (200) {Boolean} isAnswer -Whether it is an answer
 * @apiSuccess (200) {String} title -Title of the forum
 * @apiSuccess (200) {String} text -Textbody of the forum/Answers
 * @apiSuccess (200) {Date} createdAt -Time at which the forum was created
 * @apiSuccess (200) {Date} updatedAt -Time at which the forum was updated
 * @apiSuccess (200) {ObjectID} author -The author of the forum
 * @apiSuccess (200) {Array} upvoters -Array of objectIds of upvoters
 * @apiSuccess (200) {Array} downvoters -Array of objectIds of downvoters
 * @apiSuccess (200) {Array} tags - Array of objectIds of Tags
 * @apiSuccess (200) {Array} answers - Array of objectIds of Answers
 */
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const doc = await Forum.findByIdAndUpdate(id, req.body,{new:true});
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found'
    });
  }

  logger.updated('Forum', doc);
  return res.json(doc);
};

/**
 * @apiGroup Forum
 * @api {DELETE} /api/forum/:id 
 * @apiDescription Delete a Forum by its id
 * @apiPermission LoggedIn and isOwner
 * @apiParam id of the Forum
 * @apiSuccess (200) {String} msg Contains value "ok"
 */
exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const doc = await Forum.findByIdAndDelete(id);
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found'
    });
  }

  logger.deleted('Forum', doc);
  return res.json({
    msg: 'ok'
  });
};
