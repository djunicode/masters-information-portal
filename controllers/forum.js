const Forum = require('../models/forum');
const User = require('../models/user');
const Tag = require('../models/tag');
const logger = require('../config/logger');
const {createForumNotification}=require('../infra/notifications');
const mongoose = require('mongoose');
const _ = require('lodash');

/**
 * @apiDefine Forum Forum
 * Developed by Naman
 */

/**
 * @apiGroup Forum
 * @api {POST} /api/forum Post a question/ answer
 * @apiDescription Post a Forum
 * @apiPermission isLoggedIn
 * @apiSuccess (201) {ObjectID} parentId - Id of the corresponding Forum (if the current document is an answer)
 * @apiSuccess (201) {Boolean} isAnswer - Whether it is an answer or a question
 * @apiSuccess (201) {String} title - Title of the forum (if the current document is a question)
 * @apiSuccess (201) {String} text - Textbody of the forum/Answers (depending on isAnswer)
 * @apiSuccess (201) {Date} createdAt - Time at which the forum was created
 * @apiSuccess (201) {Date} updatedAt - Time at which the forum was updated
 * @apiSuccess (201) {ObjectID} author - The author of the forum
 * @apiSuccess (201) {ObjectID[]} upvoters - Array of objectIds of upvoters
 * @apiSuccess (201) {ObjectID[]} downvoters - Array of objectIds of downvoters
 * @apiSuccess (201) {ObjectID[]} tags - Array of objectIds of Tags
 * @apiSuccess (201) {ObjectID[]} answers - Array of objectIds of Answers
 */
exports.create = async (req, res) => {
  const doc = await Forum.create(req.body);
  if (req.body.isAnswer) {
    const forum = await Forum.findByIdAndUpdate(req.body.parentId, { $push: { answers: doc._id } });
    logger.info(
      `Created answer ${doc._id} to question ${forum._id} posted by user ${req.body.author}`
    );
    const notification= createForumNotification(req.body.author,forum.parentId,forum._id);
    logger.created('notification',notification)
  }

  logger.created('Forum', doc);
  return res.status(201).json(doc);
};

/**
 * @apiGroup Forum
 * @api {GET} /api/forum?slugs[]=node&title=xyz Get questions/ answers
 * @apiDescription Get all Forums in db. Can also filter by tag slugs (slugs[]=node,harvard,stanford).
 * @apiPermission isLoggedIn
 * @apiParam slugs: [String], array of tag slugs and title
 * @apiSuccess (200) {ObjectID} parentId -Id of the corresponding Forum (if the current document is an answer)
 * @apiSuccess (200) {Boolean} isAnswer -Whether it is an answer or a question
 * @apiSuccess (200) {String} title -Title of the forum (if the current document is a question)
 * @apiSuccess (200) {String} text -Textbody of the forum/Answers (depending on isAnswer)
 * @apiSuccess (200) {Date} createdAt -Time at which the forum was created
 * @apiSuccess (200) {Date} updatedAt -Time at which the forum was updated
 * @apiSuccess (200) {ObjectID} author -The author of the forum
 * @apiSuccess (200) {ObjectID[]} upvoters -Array of objectIds of upvoters
 * @apiSuccess (200) {ObjectID[]} downvoters -Array of objectIds of downvoters
 * @apiSuccess (200) {ObjectID[]} tags - Array of objectIds of Tags
 * @apiSuccess (200) {ObjectID[]} answers - Array of objectIds of Answers
 */
exports.getAll = async (req, res) => {
  let queryFilter = req.query;

  if (queryFilter.slugs) {
    const { slugs } = queryFilter;
    const tags_id = await Tag.find({ slug: { $in: slugs } }).select({ _id: 1 });
    delete queryFilter.slugs;
    queryFilter.tags = { $in: tags_id };
  }
  if (queryFilter.search) {
    const { search } = queryFilter;
    queryFilter = { $text: { $search: search } };
  }

  const docs = await Forum.find(queryFilter).populate('tags').exec();
  if (!docs) {
    return res.status(404).json({
      msg: 'No documents found',
    });
  }

  logger.readMany('Forum', docs);
  return res.json(docs);
};

/**
 * @apiGroup Forum
 * @api {GET} /api/forum/:id Get a question/ answer
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
 * @apiSuccess (200) {ObjectID[]} upvoters -Array of objectIds of upvoters
 * @apiSuccess (200) {ObjectID[]} downvoters -Array of objectIds of downvoters
 * @apiSuccess (200) {ObjectID[]} tags - Array of objectIds of Tags
 * @apiSuccess (200) {ObjectID[]} answers - Array of objectIds of Answers
 */
exports.getById = async (req, res) => {
  const { id } = req.params;
  const doc = await Forum.findById(id).populate('tags').exec();
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found',
    });
  }

  logger.readOne('Forum', doc);
  return res.json(doc);
};

/**
 * @apiGroup Forum
 * @api {POST} /api/forum/:id/upvote Upvote a question/ answer
 * @apiDescription Upvote a Forum by its id
 * @apiPermission isLoggedIn
 * @apiParam id of the forum
 * @apiSuccess (201) {None} No object
 */
exports.upvoteById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const doc = await Forum.findById(id);
  //console.log(doc)
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found',
    });
  }
  //* User has already upvoted it
  if (doc.upvoters.includes(userId)) {
    await Forum.findByIdAndUpdate(id, { $pull: { upvoters: userId } });
    logger.info(`Forum Question ${id} removed upvote by ${userId}`);
    return res.status(201).send({});
  }
  //* User has already downvoted it
  if (doc.downvoters.includes(userId)) {
    await Forum.findByIdAndUpdate(id, { $pull: { downvoters: userId },$push: { upvoters: userId } });
    logger.info(`Forum Question ${id} removed downvote and added upvote by ${userId}`);
    return res.status(200).send({});
  }

  //* User has not reacted at all
  await Forum.findByIdAndUpdate(id, { $push: { upvoters: userId } });
  //Adding the tags on the post to the users liked tags
  doc.tags.forEach(tag => {
    tag = String(tag) 
    const curr =  req.user.tagLikes.get(tag)
    if(!curr){
      req.user.tagLikes.set(tag,1)
    }else{
      req.user.tagLikes.set(tag,curr+1)
    }
  });
  req.user.save()
  logger.info(`Forum Question ${id} upvoted by ${userId}`);
  return res.status(201).send({});
};

/**
 * @apiGroup Forum
 * @api {POST} /api/forum/:id/downvote Downvote a question/ answer
 * @apiDescription Downvote a Forum by its id
 * @apiPermission isLoggedIn
 * @apiParam id of the forum
 * @apiSuccess (201) {None} No object
 */
exports.downvoteById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const doc = await Forum.findById(id);
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found',
    });
  }
  if (doc.downvoters.includes(userId)) {
    await Forum.findByIdAndUpdate(id, { $pull: { downvoters: userId } });
    logger.info(`Forum Question ${id} removed downvote by ${userId}`);
    return res.status(201).send({});
  }
  //* User has already upvoted it
  if (doc.upvoters.includes(userId)) {
    await Forum.findByIdAndUpdate(id, { $pull: { upvoters: userId }, $push: { downvoters: userId } });
    logger.info(`Forum Question ${id} removed upvote and added downvote by ${userId}`);
    return res.status(200).send({});
  }
  await Forum.findByIdAndUpdate(id, { $push: { downvoters: userId } });
  logger.info(`Forum Question ${id} downvoted by ${userId}`);
  return res.status(201).send({});
};

/**
 * @apiGroup Forum
 * @api {POST} /api/forum/:id/pin Pin a question/ answer to user profile
 * @apiDescription Pin a Forum by its id
 * @apiPermission isLoggedIn
 * @apiParam id of the forum
 * @apiSuccess (201) {None} No object
 */
exports.pinById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  if (req.user.pinnedQuestions.includes(id)) {
    return res.status(409).send({
      msg: 'Already pinned question',
    });
  }
  const doc = await Forum.findById(id);
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found',
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
 * @apiSuccess (200) {ObjectID[]} upvoters -Array of objectIds of upvoters
 * @apiSuccess (200) {ObjectID[]} downvoters -Array of objectIds of downvoters
 * @apiSuccess (200) {ObjectID[]} tags - Array of objectIds of Tags
 * @apiSuccess (200) {ObjectID[]} answers - Array of objectIds of Answers
 */
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const doc = await Forum.findByIdAndUpdate(id, req.body, { new: true });
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found',
    });
  }

  logger.updated('Forum', doc);
  return res.json(doc);
};

/**
 * @apiGroup Forum
 * @api {DELETE} /api/forum/:id Delete a question/ answer
 * @apiDescription Delete a Forum by its id
 * @apiPermission LoggedIn and isOwner
 * @apiParam id of the Forum
 * @apiSuccess (200) {String} msg - Contains value "ok"
 */
exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const doc = await Forum.findByIdAndDelete(id);
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found',
    });
  }

  logger.deleted('Forum', doc);
  return res.json({
    msg: 'ok',
  });
};

/**
 * @apiGroup Forum
 * @api {GET} /api/forum/recommended
 * @apiDescription Get 
 * @apiPermission isLoggedIn
 * @apiSuccess (200) {ObjectID} parentId -Id of the corresponding Forum (if the current document is an answer)
 * @apiSuccess (200) {Boolean} isAnswer -Whether it is an answer or a question
 * @apiSuccess (200) {String} title -Title of the forum (if the current document is a question)
 * @apiSuccess (200) {String} text -Textbody of the forum/Answers (depending on isAnswer)
 * @apiSuccess (200) {Date} createdAt -Time at which the forum was created
 * @apiSuccess (200) {Date} updatedAt -Time at which the forum was updated
 * @apiSuccess (200) {ObjectID} author -The author of the forum
 * @apiSuccess (200) {ObjectID[]} upvoters -Array of objectIds of upvoters
 * @apiSuccess (200) {ObjectID[]} downvoters -Array of objectIds of downvoters
 * @apiSuccess (200) {ObjectID[]} tags - Array of objectIds of Tags
 * @apiSuccess (200) {ObjectID[]} answers - Array of objectIds of Answers
 */
exports.getRecommended = async (req, res) => {
  //For recommending based on the tags followed by the user
  const query = req.user.tagFollows
  //Checking if a tag has been liked by the user more than k times 
  req.user.tagLikes.forEach((value,key)=>{
    if(value>=3){
      query.push( mongoose.Types.ObjectId(key))
    }
  })
  const posts = await Forum.find({ 
      tags: { "$in" : query }  ,
      "createdAt":{$gt:new Date(Date.now() - 48*60*60 * 1000)} 
  }).limit(25)

  //Posts posted in the past 48 hours
  var recentPosts=[]
  if(posts.length<25){
    recentPosts = await Forum.find({ 
        "createdAt":{$gt:new Date(Date.now() - 48*60*60 * 1000)} 
     }).limit(25-posts.length)
  }
  //To remove the duplicate posts if any
  const toSend = _.unionWith(posts,recentPosts,_.isEqual)
  return res.json(toSend);
};