const Notification = require('../models/notification');
const templates = require('../constants/notifications');

const createForumNotification = async (fromUser, toUser, forumId) => {
  let body = {
    fromUser,
    toUser,
    title: 'Forum',
    message: templates.forumTemplate({ user: fromUser, question : forumId }),
    eventId: forumId,
    model: 'Forum',
  };
  const notification = await Notification.create(body);
  return notification;
};


const createChatNotification = (fromUser,toUser,chatId)=>{
    const existingNotification = await Notification.findOne({fromUser:fromUser,toUser:toUser,eventId:chatId,model:'Chat',read:false});
    if(!!existingNotification) return existingNotification; // As there is already an unread chat notification for the given chat, No need to create a new 
    let body = {
        fromUser,
        toUser,
        title: 'Chat',
        message: templates.chatTemplate({user:fromUser}),
        eventId: chatId,
        model: 'Chat',
      };
      const notification = await Notification.create(body);
      return notification;
}