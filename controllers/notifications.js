const notifications = require('../models/notification');

/**
 * @apiDefine Notification Notification
 * Developed by Heth
 */

/**
 * @apiGroup Notification
 * @api {GET} /api/notifications/ Returns all notifications from the db
 * @apiDescription Sends all the notifications to the User
 * @apiPermission All logged in users with jwt token
 * @apiSuccess (200) {ObjectId} _id Object Id of created object
 * @apiSuccess (200) {ObjectId} Object Id of Sending user
 * @apiSuccess (200) {ObjectId} Object Id of Receiving User
 * @apiSuccess (200) {String} title of the notification
 * @apiSuccess (200) {String} Message of the notification
 * @apiSuccess (200) {Boolean} read parameter
 * @apiSuccess (200) {objectId} The model object id eg.'Forum' or 'Chat'
 * @apiSuccess (200) {String} the two types of notifications eg. 'Forum' or 'chat'
 *
 */
exports.getNotifications = async (req, res) => {
  const userId = res.locals.user._id;
  const docList = await notifications.find({ toUser: userId }).populate('eventId');
  res.status(200).send(docList);
};

/**
 * @apiGroup Notification
 * @api {POST} /api/notifications/read/ Marks all unread notification as read
 * @apiDescription Marks all unread notification as read
 * @apiPermission All logged in users with jwt token
 * @apiSuccess (200) {Boolean} Turns all user notification of user as read
 *
 */
exports.readAll = async (req, res) => {
  const userId = res.locals.user._id;
  const docList = await notifications.update({ toUser: userId }, { $set: { read: true } });
  res.send(docList);
};

/**
 * @apiGroup Notification
 * @api {POST} /api/notifications/:id/read Mark particular notification as read
 * @apiDescription Marks notification Boolean as read using the notification id
 * @apiPermission All logged in users with jwt token
 * @apiParam {objectId} Object id of the notification
 * @apiSuccess (200) {Boolean} Turns Boolean to true for the notification that is read by the user
 *
 */
exports.readOne = async (req, res) => {
  const { id } = req.params;
  const doc = await notifications.findByIdAndUpdate(id, { $set: { read: true } });
  res.status(200).send(doc);
};

/**
 * @apiGroup Notification
 * @api {DELETE} /api/notifications/ Deletes all user notifications
 * @apiDescription Delete all user notifications
 * @apiPermission All logged in users with jwt token
 * @apiSuccess (200) {Object} Deletes all notifications from the database
 *
 */
exports.deleteAll = async (req, res) => {
  const userId = res.locals.user._id;
  const docList = await notifications.remove({ toUser: userId });
  res.send(docList);
};

// DELETE /:id - Delete a single notification with its id
/**
 * @apiGroup Notification
 * @api {DELETE} /api/notifications/:id Delete notification using id of the notification
 * @apiDescription Delete notification using id of the notification
 * @apiPermission All logged in users with jwt token
 * @apiParam {objectId} objectId of the particular notification viewed
 * @apiSuccess (200) {Object} Deletes notification based on its object Id
 *
 */
exports.deleteOne = async (req, res) => {
  const { id } = req.params;
  const doc = await notifications.findByIdAndDelete(id);
  res.send(doc);
};
