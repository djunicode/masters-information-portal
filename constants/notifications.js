const _ = require('lodash');

const MAX_VOTE_LIMIT = 10;

const UPVOTE = 'Upvoted';
const DOWNVOTE = 'Downvoted';

const MODEL_FORUM = 'Forum';
const MODEL_CHAT = 'Chat';

const chatTemplate = _.template('<%= user %> has messaged you.');
const forumTemplate = _.template('<%= user %> posted an answer for your question <%= question %>');
const voteTemplateNamed = _.template('<%= user %> <%= voteType => your <%= forumId %>');
const voteTemplateNumbered = _.template(
  '<%= number %> users have  <%= voteType => your <%= forumId %>'
);

module.exports = {
  UPVOTE,
  DOWNVOTE,
  MODEL_FORUM,
  MODEL_CHAT,
  chatTemplate,
  forumTemplate,
  voteTemplateNamed,
  voteTemplateNumbered,
  MAX_VOTE_LIMIT,
};
