const lodash = require('lodash');

const MAX_VOTE_LIMIT = 10;

const upvote = 'Upvoted';
const downvote = 'Downvoted';

const chatTemplate = lodash.template('<%= user %> has messaged you.');
const forumTemplate = lodash.template(
  '<%= user %> posted an answer for your question <%= question %>'
);
const voteTemplateNamed = lodash.template('<%= user %> <%= voteType => your <%= forumId %>');
const voteTemplateNumbered = lodash.template(
  '<%= number %> users have  <%= voteType => your <%= forumId %>'
);

module.exports = {
  upvote,
  downvote,
  chatTemplate,
  forumTemplate,
  voteTemplateNamed,
  voteTemplateNumbered,
  MAX_VOTE_LIMIT,
};
