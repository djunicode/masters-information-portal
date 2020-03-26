process.env.NODE_ENV = 'test';
const config = require('./config');
const User = require('../models/user');
const Forum = require('../models/forum');
const { dbConnection } = require('../config/db');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let Should = chai.should();
const expect = chai.use(chaiHttp).expect;

let user, token, forum;
describe(config.GROUP_FORUM_TESTS, () => {
  beforeEach(async () => {
    await dbConnection();
    await User.deleteMany({});
    await Forum.deleteMany({});
    const res1 = await chai
      .request(server)
      .post('/api/users/register')
      .send({ name: 'Test', email: 'test@test.com', password: '123456789' });
    const res2 = await chai
      .request(server)
      .post('/api/users/login')
      .send({ email: 'test@test.com', password: '123456789' });
    user = res2.body.userObject;
    token = res2.body.token;
    const res3 = await chai
      .request(server)
      .post('/api/forum')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TestTitle',
        text: 'TestText',
        author: user._id,
        isAnswer: false
      });
    forum = res3.body;
  });
  it(config.TEST_UNAUTHENTICATED_REQ, async () => {
    const res1 = await chai
      .request(server)
      .post('/api/forum')
      .send({});
    expect(res1).to.have.status(401);
  });

  it(config.TEST_VALID_UPVOTE, async () => {
    const res1 = await chai
      .request(server)
      .post(`/api/forum/${forum._id}/upvote`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(res1).to.have.status(201);
  });

  it(config.TEST_MULTIPLE_UPVOTES, async () => {
    const res1 = await chai
      .request(server)
      .post(`/api/forum/${forum._id}/upvote`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    const res2 = await chai
      .request(server)
      .post(`/api/forum/${forum._id}/upvote`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(res2).to.have.status(409);
  });

  it(config.TEST_VALID_DOWNVOTE, async () => {
    const res1 = await chai
      .request(server)
      .post(`/api/forum/${forum._id}/downvote`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(res1).to.have.status(201);
  });

  it(config.TEST_MULTIPLE_DOWNVOTES, async () => {
    const res1 = await chai
      .request(server)
      .post(`/api/forum/${forum._id}/downvote`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    const res2 = await chai
      .request(server)
      .post(`/api/forum/${forum._id}/downvote`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(res2).to.have.status(409);
  });

  it(config.TEST_UPVOTE_AND_DOWNVOTE, async () => {
    const res1 = await chai
      .request(server)
      .post(`/api/forum/${forum._id}/upvote`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    const res2 = await chai
      .request(server)
      .post(`/api/forum/${forum._id}/downvote`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    const res3 = await chai
      .request(server)
      .post(`/api/forum/${forum._id}/upvote`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    //* As the upvote is removed after downvote, we should be able to upvote again
    expect(res3).to.have.status(201);
  });

  it(config.TEST_DOWNVOTE_AND_UPNVOTE, async () => {
    const res1 = await chai
      .request(server)
      .post(`/api/forum/${forum._id}/downvote`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    const res2 = await chai
      .request(server)
      .post(`/api/forum/${forum._id}/upvote`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    const res3 = await chai
      .request(server)
      .post(`/api/forum/${forum._id}/downvote`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    //* As the downvote is removed after upvote, we should be able to downvote again
    expect(res3).to.have.status(201);
  });

  it(config.TEST_VALID_PINNING, async () => {
    const res1 = await chai
      .request(server)
      .post(`/api/forum/${forum._id}/pin`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(res1).to.have.status(201);
  });

  it(config.TEST_MULTIPLE_PINNING, async () => {
    const res1 = await chai
      .request(server)
      .post(`/api/forum/${forum._id}/pin`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    const res2 = await chai
      .request(server)
      .post(`/api/forum/${forum._id}/pin`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(res2).to.have.status(409);
    expect(res2.body).to.have.property('msg');
  });

  it(config.TEST_ANSWER_WITHOUT_ID, async () => {
    const res1 = await chai
      .request(server)
      .post('/api/forum')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TestTitle',
        text: 'TestText',
        author: user._id,
        isAnswer: true
      });
    expect(res1).to.have.status(400);
    expect(res1.body).to.have.property('parentId');
    expect(res1.body.parentId.kind)
      .to.be.a('string')
      .eql('required');
  });

  it(config.TEST_VALID_ANSWER, async () => {
    const res1 = await chai
      .request(server)
      .post('/api/forum')
      .set('Authorization', `Bearer ${token}`)
      .send({
        text: 'TestAnsText',
        author: user._id,
        isAnswer: true,
        parentId: forum._id
      });
    expect(res1).to.have.status(201);
    expect(res1.body)
      .to.have.property('author')
      .eql(user._id);
    expect(res1.body)
      .to.have.property('parentId')
      .eql(forum._id);
    expect(res1.body)
      .to.have.property('isAnswer')
      .eql(true);
    expect(res1.body)
      .to.have.property('title')
      .eql('');
    expect(res1.body)
      .to.have.property('text')
      .eql('TestAnsText');

    //* Check if answer id is added to forum question
    const res2 = await chai.request(server).get(`/api/forum/${forum._id}`);
    expect(res2).to.have.status(200);
    expect(res2.body)
      .to.have.property('answers')
      .to.be.a('array');
    expect(Array.from(res2.body.answers).length === 1).to.be.eql(true);
    expect(JSON.stringify(res2.body.answers[0])).to.be.eql(JSON.stringify(res1.body._id));
  });
});
