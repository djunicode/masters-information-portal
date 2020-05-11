process.env.NODE_ENV = 'test';
const config = require('./config');
const User = require('../models/user');
const { dbConnection } = require('../config/db');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let Should = chai.should();
const expect = chai.use(chaiHttp).expect;

describe(config.GROUP_USER_TESTS, () => {
  before(async () => {
    await dbConnection();
  });
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it(config.TEST_INCOMPLETE_DETAILS, async () => {
    const user1 = await chai.request(server).post('/api/users/register').send({});
    expect(user1).to.have.status(400);
    expect(user1.body).to.be.a('object');
    expect(user1.body).to.have.property('password');
    expect(user1.body).to.have.property('email');
    expect(user1.body).to.have.property('name');

    const user2 = await chai
      .request(server)
      .post('/api/users/register')
      .send({ name: 'Test', password: 'test' });
    console.log(user2.body);
    expect(user2).to.have.status(400);
    expect(user2.body).to.be.a('object');
    expect(user2.body).to.have.property('password');
    expect(user2.body.password)
      .to.have.property('message')
      .to.be.a('string')
      .eql('Password is too short!');
    expect(user2.body).to.have.property('email');
    expect(user2.body).to.not.have.property('name');

    const user3 = await chai
      .request(server)
      .post('/api/users/register')
      .send({ name: 'Test', email: 'Not a email', password: 'test123456' });
    expect(user3).to.have.status(400);
    expect(user3.body).to.be.a('object');
    expect(user3.body).to.not.have.property('password');
    expect(user3.body).to.have.property('email');
    expect(user3.body.email).to.have.property('message').to.be.a('string').eql('Email is Invalid');
    expect(user2.body).to.not.have.property('name');
  });

  it(config.TEST_VALID_USER, async () => {
    const res = await chai
      .request(server)
      .post('/api/users/register')
      .send({ name: 'Test', email: 'test@test.com', password: '123456789' });
    expect(res).to.have.status(201);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('userObject');
    expect(res.body).to.have.property('token');
    expect(res.body).to.have.property('refreshToken');
    expect(res.body.userObject.name).to.be.a('string').eql('Test');
    expect(res.body.userObject.email).to.be.a('string').eql('test@test.com');
  });
  it(config.TEST_DUPLICATE_USER, async () => {
    const res1 = await chai
      .request(server)
      .post('/api/users/register')
      .send({ name: 'Test', email: 'test@test.com', password: '123456789' });
    const res2 = await chai
      .request(server)
      .post('/api/users/register')
      .send({ name: 'Test1', email: 'test@test.com', password: '123456789' });
    expect(res2).to.have.status(400);
    expect(res2.body).to.be.a('object');
    expect(res2.body).to.have.property('msg');
    expect(res2.body).to.not.have.property('user');
    expect(res2.body).to.not.have.property('token');
    expect(res2.body.msg).to.be.a('string').eql('User already exists, try logging in!');
  });

  it(config.TEST_INVALID_LOGIN, async () => {
    //* non-existing user
    const res1 = await chai
      .request(server)
      .post('/api/users/login')
      .send({ email: 'test@test.com', password: '123456789' });
    expect(res1).to.have.status(401);
    expect(res1.body).to.be.a('object');
    expect(res1.body).to.have.property('msg');
    expect(res1.body.msg).to.be.a('string').eql('User email not found.');
    expect(res1.body).to.not.have.property('user');
    expect(res1.body).to.not.have.property('token');

    //* create user
    const user = await chai
      .request(server)
      .post('/api/users/register')
      .send({ name: 'Test', email: 'test@test.com', password: '123456789' });

    const res2 = await chai
      .request(server)
      .post('/api/users/login')
      .send({ email: 'test@test.com', password: '1234' });
    expect(res2).to.have.status(401);
    expect(res2.body).to.be.a('object');
    expect(res2.body).to.have.property('msg');
    expect(res2.body).to.not.have.property('user');
    expect(res2.body).to.not.have.property('token');
    expect(res2.body.msg).to.be.a('string').eql("User password didn't match.");
  });

  it(config.TEST_VALID_LOGIN, async () => {
    //* create user
    const user = await chai
      .request(server)
      .post('/api/users/register')
      .send({ name: 'Test', email: 'test@test.com', password: '123456789' });

    const res2 = await chai
      .request(server)
      .post('/api/users/login')
      .send({ email: 'test@test.com', password: '123456789' });
    expect(res2).to.have.status(200);
    expect(res2.body).to.be.a('object');
    expect(res2.body).to.not.have.property('msg');
    expect(res2.body).to.have.property('userObject');
    expect(res2.body).to.have.property('token');
    expect(res2.body).to.have.property('refreshToken');
  });
  after(async () => {
    await User.deleteMany({});
  });
});
