process.env.NODE_ENV = 'test';
const config = require('./config');
const User = require('../models/user');
const { dbConnection } = require('../config/db');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let Should = chai.should();
const expect = chai.use(chaiHttp).expect;

let user, token;
describe(config.GROUP_USER_TESTS, () => {
  beforeEach(async () => {
    await dbConnection();
    await User.deleteMany({});
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
  });

  it(config.TEST_UNAUTHENTICATED_REQ, async () => {
    const res1 = await chai
      .request(server)
      .get('/api/users/me')
      .send({});
    expect(res1).to.have.status(401);
    expect(res1.body).to.have.property('msg');

    const res2 = await chai
      .request(server)
      .put('/api/users/me')
      .send({});
    expect(res1).to.have.status(401);
    expect(res1.body).to.have.property('msg');
  });

  //! WAITING FOR AUTH-CHANGES
  it(config.TEST_PUBLIC_PROFILE, async () => {
    const res1 = await chai
      .request(server)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(res1).to.have.status(200);
    expect(res1.body)
      .to.have.property('accepts')
      .to.be.a('array');
    expect(res1.body)
      .to.have.property('rejects')
      .to.be.a('array');
  });
});
