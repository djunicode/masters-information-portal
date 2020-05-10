const lodash = require('lodash');

const chatTemplate = lodash.template('<%= user %> has messaged you.');
const forumTemplate = lodash.template(
  '<%= user %> posted an answer for your question <%= question %>'
);

module.exports = { chatTemplate, forumTemplate };
