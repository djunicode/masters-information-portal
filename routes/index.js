const userRouter = require('./user');
const forumRouter = require('./forum');
const tagRouter = require('./tag');
const chatRouter = require('./chat');
const notificationsRouter=require('./notifications');

module.exports = {
  userRouter,
  tagRouter,
  forumRouter,
  chatRouter,
  notificationsRouter
};
