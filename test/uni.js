// process.env.NODE_ENV = 'test';
const config = require('./config');
const Uni = require('../models/university');
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
    await Uni.deleteMany({});
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

  it(config.TEST_VALID_TAG, async () => {
    //* To Test normal basic new tag creation
    let tag = await chai
      .request(server)
      .post('/api/university/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'University of California',
        description: 'description of University of California',
        address: 'Address of University of California',
        contacts: [
          { type: 'phone', value: 1234567890 },
          { type: 'website', value: 'http://www.djsce.ac.in/' },
        ],
        avg_gre: 0,
        avg_lang: 0,
        fees: -1,
      });
    expect(tag).to.have.status(201);
    //* To test slug array creation, with spaces in name
    tag = await chai
      .request(server)
      .post('/api/university/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'University of Texas',
        description: 'description of University of Texas',
        address: 'Address of University of Texas',
        contacts: [
          { type: 'phone', value: 1234567890 },
          { type: 'website', value: 'http://www.djsce.ac.in/' },
        ],
        avg_gre: 0,
        avg_lang: 0,
        fees: -1,
      });
    console.log(tag.body);
    expect(tag).to.have.status(201);
    tag = await chai
      .request(server)
      .post('/api/university/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Cambridge University',
        description: 'description of Cambridge University',
        address: 'Address of Cambridge University',
        contacts: [
          { type: 'phone', value: 1234567890 },
          { type: 'website', value: 'http://www.djsce.ac.in/' },
        ],
        avg_gre: 0,
        avg_lang: 0,
        fees: -1,
      });
    expect(tag).to.have.status(201);
    tag = await chai
      .request(server)
      .post('/api/university/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Oxford University',
        description: 'description of Oxford University',
        address: 'Address of Oxford University',
        contacts: [
          { type: 'phone', value: 1234567890 },
          { type: 'website', value: 'http://www.djsce.ac.in/' },
        ],
        avg_gre: 0,
        avg_lang: 0,
        fees: -1,
      });
    expect(tag).to.have.status(201);
    let test = await Uni.find({});
    console.log(test);
  });

  after(async () => {
    await User.deleteMany({});
  });
});
