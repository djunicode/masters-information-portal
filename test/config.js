const GROUP_TAG_TESTS = 'TAG Routes Tests';
const TEST_INCOMPLETE_DETAILS = 'Should not Register incomplete details';
const TEST_VALID_TAG = 'Should Register valid Tag';
const TEST_NON_EXISTING_TAG = 'Should give error for non existing tag';
const TEST_EXISTING_TAG_RETRIEVAL = 'Should retrieve existing tag';
const TEST_ERROR_DELETE_NON_EXISTING = 'Should give error on deleting non existing tag';
const TEST_DELETE_EXISTING = 'Should Delete Existing Tag';

const GROUP_USER_TESTS = 'USER Routes Tests';
const TEST_VALID_USER = 'Should Register valid User';
const TEST_DUPLICATE_USER = 'Should not register same email twice';
const TEST_INVALID_LOGIN = 'Should not allow Invalid log-ins';
const TEST_VALID_LOGIN = 'Should allow valid log-ins';
const TEST_UNAUTHENTICATED_REQ = 'Should not allow unauthenticated requests to protected routes';
const TEST_PUBLIC_PROFILE = 'Should get public profile';
//* Still tests remaining

const GROUP_FORUM_TESTS = 'FORUM route tests';
const TEST_VALID_UPVOTE = 'Should allow upvoting';
const TEST_MULTIPLE_UPVOTES = 'Should not allow same user to upvote multiple times';
const TEST_VALID_DOWNVOTE = 'Should allow downvoting';
const TEST_MULTIPLE_DOWNVOTES = 'Should not allow same user to downvote multiple times';
const TEST_UPVOTE_AND_DOWNVOTE = 'Should remove upvote after downvoting';
const TEST_DOWNVOTE_AND_UPNVOTE = 'Should remove downvote after upvoting';
const TEST_VALID_PINNING = 'Should allow pinning of questions';
const TEST_MULTIPLE_PINNING = 'Should not allow multiple pinning of questions';
const TEST_ANSWER_WITHOUT_ID = 'Should not alllow posting an answer without parent Id parameter';
const TEST_VALID_ANSWER = 'Should allow a valid answer to be posted';
//* Still tests remaining

module.exports = {
  GROUP_TAG_TESTS,
  TEST_INCOMPLETE_DETAILS,
  TEST_VALID_TAG,
  TEST_NON_EXISTING_TAG,
  TEST_EXISTING_TAG_RETRIEVAL,
  TEST_ERROR_DELETE_NON_EXISTING,
  TEST_DELETE_EXISTING,
  GROUP_USER_TESTS,
  TEST_VALID_USER,
  TEST_DUPLICATE_USER,
  TEST_INVALID_LOGIN,
  TEST_VALID_LOGIN,
  TEST_UNAUTHENTICATED_REQ,
  TEST_PUBLIC_PROFILE,
  GROUP_FORUM_TESTS,
  TEST_VALID_UPVOTE,
  TEST_MULTIPLE_UPVOTES,
  TEST_VALID_DOWNVOTE,
  TEST_MULTIPLE_DOWNVOTES,
  TEST_UPVOTE_AND_DOWNVOTE,
  TEST_DOWNVOTE_AND_UPNVOTE,
  TEST_VALID_PINNING,
  TEST_MULTIPLE_PINNING,
  TEST_ANSWER_WITHOUT_ID,
  TEST_VALID_ANSWER,
};
