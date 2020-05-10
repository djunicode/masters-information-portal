const Notification = require('../models/notification');
const templates = require('../constants/notifications');

/**
 *
 * @param {String} fromUser user who answered the post
 * @param {String} toUser user whose post was answered
 * @param {String} forumId id of the corresponding post
 */
const createForumNotification = async (fromUser, toUser, forumId) => {
  let body = {
    fromUser,
    toUser,
    title: 'Forum',
    message: templates.forumTemplate({ user: fromUser, question: forumId }),
    eventId: forumId,
    model: 'Forum',
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
    fromUser: fromUser,
    toUser: toUser,
    eventId: chatId,
    model: 'Chat',
    read: false,
  });
  if (!!existingNotification) return existingNotification; // As there is already an unread chat notification for the given chat, No need to create a new
  let body = {
    fromUser,
    toUser,
    title: 'Chat',
    message: templates.chatTemplate({ user: fromUser }),
    eventId: chatId,
    model: 'Chat',
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
  //First check if numbered vote exists
  let doc = await Notification.findOne({
    toUser: toUser,
    read: false,
    title: 'Numbered' + voteType,
    eventId: forumId,
  });
  // We found an existing numbered notification
  if (!!doc) {
    let num = doc.message.match(/\d+/g).map(Number)[0]; // Extract Number of existing Notification from the message.
    let ret = await Notification.findByIdAndUpdate(
      doc._id,
      {
        message: templates.voteTemplateNumbered({
          number: num + 1,
          voteType: voteType,
          forumId: forumId,
        }),
      },
      { new: true }
    );
    return ret;
  }

  //If no numbered notification was existing we check if the total number of named notification is at tipping point
  let docs = await Notification.find({
    toUser: toUser,
    read: false,
    title: voteType,
    eventId: forumId,
  });

  if (docs.length === templates.MAX_VOTE_LIMIT) {
    await Notification.deleteMany({
      toUser: toUser,
      read: false,
      title: voteType,
      eventId: forumId,
    });

    let notification = await Notification.create({
      toUser: toUser,
      title: 'Numbered' + voteType,
      eventId: forumId,
      message: templates.voteTemplateNumbered({
        number: templates.MAX_VOTE_LIMIT + 1,
        voteType: voteType,
        forumId: forumId,
      }),
      model: 'Forum',
    });
    return notification;
  }

  //The Named notifications are below tipping point, so we add another one.

  let notification = await Notification.create({
    fromUser: fromUser,
    toUser: toUser,
    title: voteType,
    message: templates.voteTemplateNamed({ user: fromUser, voteType: voteType, forumId: forumId }),
    eventId: forumId,
    model: 'Forum',
  });

  return notification;
};
