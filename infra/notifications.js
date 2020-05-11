const Notification = require('../models/notification');
const constants = require('../constants/notifications');

/**
 *
 * @param {String} fromUser user who answered the post
 * @param {String} toUser user whose post was answered
 * @param {String} forumId id of the corresponding post
 */
const createForumNotification = async (fromUser, toUser, forumId) => {
  const body = {
    fromUser,
    toUser,
    title: constants.MODEL_FORUM,
    message: constants.forumTemplate({ user: fromUser, question: forumId }),
    eventId: forumId,
    model: constants.MODEL_FORUM,
  };
  const notification = await Notification.create(body);
  return notification;
};

/**
 *
 * @param {String} fromUser user who sent the message
 * @param {String} toUser user to whom the message was sent
 * @param {String} chatId id of the corresponding chat
 */
const createChatNotification = async (fromUser, toUser, chatId) => {
  const existingNotification = await Notification.findOne({
    fromUser,
    toUser,
    eventId: chatId,
    model: constants.MODEL_CHAT,
    read: false,
  });
  if (existingNotification) return existingNotification; // As there is already an unread chat notification for the given chat, No need to create a new
  const body = {
    fromUser,
    toUser,
    title: constants.MODEL_CHAT,
    message: constants.chatTemplate({ user: fromUser }),
    eventId: chatId,
    model: constants.MODEL_CHAT,
  };
  const notification = await Notification.create(body);
  return notification;
};

/**
 *
 * @param {String} fromUser user who upvoted/downvoted the post
 * @param {String} toUser user whose post has been upvoted/downvoted
 * @param {String} forumId id of the post
 * @param {} voteType Use constants/notifications.js upvote/downvote
 */
const createVoteNotification = async (fromUser, toUser, forumId, voteType) => {
  // First check if numbered vote exists
  const doc = await Notification.findOne({
    toUser,
    read: false,
    title: `Numbered${voteType}`,
    eventId: forumId,
  });
  // We found an existing numbered notification
  if (doc) {
    const num = doc.message.match(/\d+/g).map(Number)[0]; // Extract Number of existing Notification from the message.
    const ret = await Notification.findByIdAndUpdate(
      doc._id,
      {
        message: constants.voteTemplateNumbered({
          number: num + 1,
          voteType,
          forumId,
        }),
      },
      { new: true }
    );
    return ret;
  }

  // If no numbered notification was existing we check if the total number of named notification is at tipping point
  const docs = await Notification.find({
    toUser,
    read: false,
    title: voteType,
    eventId: forumId,
  });

  if (docs.length === constants.MAX_VOTE_LIMIT) {
    await Notification.deleteMany({
      toUser,
      read: false,
      title: voteType,
      eventId: forumId,
    });

    const notification = await Notification.create({
      toUser,
      title: `Numbered${voteType}`,
      eventId: forumId,
      message: constants.voteTemplateNumbered({
        number: constants.MAX_VOTE_LIMIT + 1,
        voteType,
        forumId,
      }),
      model: constants.MODEL_FORUM,
    });
    return notification;
  }

  // The Named notifications are below tipping point, so we add another one.

  const notification = await Notification.create({
    fromUser,
    toUser,
    title: voteType,
    message: constants.voteTemplateNamed({ user: fromUser, voteType, forumId }),
    eventId: forumId,
    model: constants.MODEL_CHAT,
  });

  return notification;
};

module.exports = { createChatNotification, createForumNotification, createVoteNotification };
