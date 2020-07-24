const userRouter = require('./user');
const forumRouter = require('./forum');
const tagRouter = require('./tag');
const chatRouter = require('./chat');
const notificationsRouter = require('./notifications');
const universityRouter = require('./university');

module.exports = {
  userRouter,
  tagRouter,
  forumRouter,
  chatRouter,
  notificationsRouter,
  universityRouter,
};
