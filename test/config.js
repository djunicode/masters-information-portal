const GROUP_TAG_TESTS = 'TAG Routes Tests';
const TEST_INCOMPLETE_DETAILS = 'Should not Register incomplete details';
const TEST_VALID_TAG = 'Should Register valid Tag';
const TEST_NON_EXISTING_TAG = 'Should give error for non existing tag';
const TEST_EXISTING_TAG_RETREVAL = 'Should retrieve existing tag';
const TEST_ERROR_DELETE_NON_EXISTING = 'Should give error on deleting non existing tag';
const TEST_DELETE_EXISTING = 'Should Delete Existing Tag';

const GROUP_USER_TESTS = 'USER Routes Tests';
const TEST_VALID_USER = 'Should Register valid User';
const TEST_DUPLICATE_USER = 'Should not register same email twice';
const TEST_INVALID_LOGIN = 'Should not allow Invalid log-ins';
const TEST_VALID_LOGIN = 'Should allow valid log-ins';
const TEST_UNAUTHENTICATED_REQ = 'SHould not allow unauthenticated requests to protected routes';
const TEST_PUBLIC_PROFILE = 'Should get public profile';

module.exports = {
  GROUP_TAG_TESTS,
  TEST_INCOMPLETE_DETAILS,
  TEST_VALID_TAG,
  TEST_NON_EXISTING_TAG,
  TEST_EXISTING_TAG_RETREVAL,
  TEST_ERROR_DELETE_NON_EXISTING,
  TEST_DELETE_EXISTING,
  GROUP_USER_TESTS,
  TEST_VALID_USER,
  TEST_DUPLICATE_USER,
  TEST_INVALID_LOGIN,
  TEST_VALID_LOGIN,
  TEST_UNAUTHENTICATED_REQ,
  TEST_PUBLIC_PROFILE
};
