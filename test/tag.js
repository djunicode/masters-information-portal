process.env.NODE_ENV = 'test';
const config = require('./config');
const Tag = require('../models/tag');
const User = require('../models/user');
const { dbConnection } = require('../config/db');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let Should = chai.should();
const expect = chai.use(chaiHttp).expect;

let user, token;

describe(config.GROUP_TAG_TESTS, async () => {
  before(async () => {
    await dbConnection();
  });
  beforeEach(async () => {
    await Tag.deleteMany({});
    await User.deleteMany({});
    const res1 = await chai
      .request(server)
      .post('/api/users/register')
      .send({ name: 'Test', email: 'test@test.com', password: '123456789', role: ['admin'] });
    const res2 = await chai
      .request(server)
      .post('/api/users/login')
      .send({ email: 'test@test.com', password: '123456789' });
    user = res2.body.userObject;
    token = res2.body.token;
  });

  beforeEach(async () => {
    await Tag.deleteMany({});
  });

  it(config.TEST_INCOMPLETE_DETAILS, async () => {
    const tag1 = await chai
      .request(server)
      .post('/api/tags/')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(tag1).to.have.status(400);
    expect(tag1.body).to.be.a('object');
    expect(tag1.body).to.not.have.property('tag');
    expect(tag1.body).to.have.property('name');
    expect(tag1.body.name.kind).to.be.a('string').eql('required');
  });

  it(config.TEST_VALID_TAG, async () => {
    //* To Test normal basic new tag creation
    const tag1 = await chai
      .request(server)
      .post('/api/tags/')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Caltech', isSchool: true });
    expect(tag1).to.have.status(201);
    expect(tag1.body).to.be.a('object');
    expect(tag1.body.name).to.be.eql('Caltech');
    expect(tag1.body.isSchool).to.be.eql(true);
    expect(tag1.body.slug).to.be.a('string');

    //* To test slug array creation, with spaces in name
    const tag2 = await chai
      .request(server)
      .post('/api/tags/')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'M I T', isSchool: true });

    expect(tag2).to.have.status(201);
    expect(tag2.body).to.be.a('object');
    expect(tag2.body.name).to.be.eql('M I T');
    expect(tag2.body.slug).to.be.a('string');
    expect(tag2.body.slug).to.be.eql('m-i-t');
  });

  it(config.TEST_NON_EXISTING_TAG, async () => {
    const test1 = await chai
      .request(server)
      .get('/api/tags/test')
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(test1).to.have.status(404);
    expect(test1).to.be.a('object');
    expect(test1.body).to.not.have.property('name');
    expect(test1.body).to.have.property('msg');
    expect(test1.body.msg).to.be.a('string').eql('Not found');
  });

  it(config.TEST_EXISTING_TAG_RETRIEVAL, async () => {
    const tag1 = await chai
      .request(server)
      .post('/api/tags/')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Caltech', isSchool: true });
    const tag2 = await chai
      .request(server)
      .post('/api/tags/')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'M I T', isSchool: true });

    //* Retrieval by slug
    const test1 = await chai
      .request(server)
      .get('/api/tags/m-i-t')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(test1).to.have.status(200);
    expect(test1).to.be.a('object');
    expect(test1.body).to.not.have.property('msg');

    expect(test1.body).to.have.property('name');
    expect(test1.body).to.have.property('isSchool');
    expect(test1.body).to.have.property('slug').eql('m-i-t');

    //* Retrieve All
    const test2 = await chai
      .request(server)
      .get('/api/tags/')
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(test2).to.have.status(200);
    expect(test2.body).to.be.a('array');
    expect(test2.body).to.not.have.property('msg');
    expect(Array.from(test2.body).length === 2).to.be.eql(true);
    expect(test2.body[0]).to.be.a('object');
    expect(test2.body[1]).to.be.a('object');
    expect(test2.body[0].slug).to.be.a('string').eql('caltech');
    expect(test2.body[1].slug).to.be.a('string').eql('m-i-t');
  });

  it(config.TEST_ERROR_DELETE_NON_EXISTING, async () => {
    const test1 = await chai
      .request(server)
      .delete(`/api/tags/mit`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(test1).to.have.status(404);
    expect(test1).to.be.a('object');
    expect(test1.body).to.have.property('msg');
    expect(test1.body.msg).to.be.a('string').eql('Not found');
  });

  it(config.TEST_DELETE_EXISTING, async () => {
    const res1 = await chai
      .request(server)
      .post('/api/tags/')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Caltech', isSchool: true });
    const res2 = await chai
      .request(server)
      .post('/api/tags/')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'M I T', isSchool: true });
    const test1 = await chai
      .request(server)
      .delete(`/api/tags/m-i-t`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(test1).to.have.status(200);
    expect(test1).to.be.a('object');
    expect(test1.body).to.have.property('msg');
    expect(test1.body.msg).to.be.a('string').eql('ok');

    //* To check no other tag is deleted
    const test2 = await chai
      .request(server)
      .get('/api/tags/caltech')
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(test2).to.have.status(200);
    expect(test2).to.be.a('object');
    expect(test2.body).to.not.have.property('msg');
    expect(test2.body).to.have.property('slug').eql('caltech');
  });

  after(async () => {
    await User.deleteMany({});
    await Tag.deleteMany({});
  });
});
