process.env.NODE_ENV = 'test';
const config = require('./config');
const tag = require('../models/tag');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let Should = chai.should();
const expect = chai.use(chaiHttp).expect;

describe(config.GROUP_TAG_TESTS, () => {
  beforeEach(done => {
    tag.deleteMany({}, err => {
      done();
    });
  });

  it(config.TEST_INCOMPLETE_DETAILS, async () => {
    const tag1 = await chai
      .request(server)
      .post('/api/tag/')
      .send({});

    expect(tag1).to.have.status(400);
    expect(tag1.body).to.be.a('object');
    expect(tag1.body).to.not.have.property('tag');
    expect(tag1.body).to.have.property('err');
    expect(tag1.body.err).to.be.a('string');
  });

  it(config.TEST_VALID_TAG, async () => {
    //* To Test normal basic new tag creation
    const tag1 = await chai
      .request(server)
      .post('/api/tag/')
      .send({ name: 'Caltech', isSchool: true });

    expect(tag1).to.have.status(201);
    expect(tag1.body).to.be.a('object');
    expect(tag1.body).to.have.property('tag');
    expect(tag1.body).to.not.have.property('err');
    expect(tag1.body.tag).to.be.a('object');
    expect(tag1.body.tag.name).to.be.eql('Caltech');
    expect(tag1.body.tag.isSchool).to.be.eql(true);
    expect(tag1.body.tag.slug).to.be.a('array');

    //* To test slug array creation, with spaces in name
    const tag2 = await chai
      .request(server)
      .post('/api/tag/')
      .send({ name: 'M I T', isSchool: true });

    expect(tag2).to.have.status(201);
    expect(tag2.body).to.be.a('object');
    expect(tag2.body).to.have.property('tag');
    expect(tag2.body.tag.name).to.be.eql('M I T');
    expect(tag2.body.tag.slug).to.be.a('array');
    expect(tag2.body.tag.slug[0]).to.be.eql('mit');
  });

  it(config.TEST_NON_EXISTING_TAG, async () => {
    //* retrieval by name
    const test1 = await chai
      .request(server)
      .get('/api/tag/test')
      .send();
    expect(test1).to.have.status(404);
    expect(test1).to.be.a('object');
    expect(test1.body).to.not.have.property('tag');
    expect(test1.body).to.have.property('err');
    expect(test1.body.err).to.be.a('string');

    //* retrieval by slug
    const test2 = await chai
      .request(server)
      .get('/api/tag/slug/test')
      .send();
    expect(test2).to.have.status(404);
    expect(test2).to.be.a('object');
    expect(test2.body).to.not.have.property('tag');
    expect(test2.body).to.have.property('err');
    expect(test2.body.err).to.be.a('string');
  });

  it(config.TEST_EXISTING_TAG_RETREVAL, async () => {
    //* retrieval by name
    const tag1 = await chai
      .request(server)
      .post('/api/tag/')
      .send({ name: 'Caltech', isSchool: true });

    const test1 = await chai
      .request(server)
      .get('/api/tag/Caltech')
      .send();
    expect(test1).to.have.status(200);
    expect(test1).to.be.a('object');
    expect(test1.body).to.not.have.property('err');

    expect(test1.body).to.have.property('name');
    expect(test1.body.name)
      .to.be.a('string')
      .eql('Caltech');

    expect(test1.body).to.have.property('isSchool');
    expect(test1.body.isSchool)
      .to.be.a('boolean')
      .eql(true);

    expect(test1.body).to.have.property('slug');
    expect(test1.body.slug).to.be.a('array');
    expect(test1.body.slug.length).eql(1);
    expect(test1.body.slug[0]).eql('caltech');

    //* retrieval by slug
    const test2 = await chai
      .request(server)
      .get('/api/tag/slug/caltech')
      .send();

    expect(test2).to.have.status(200);
    expect(test2).to.be.a('object');
    expect(test2.body).to.not.have.property('err');

    expect(test1.body).to.have.property('name');
    expect(test1.body).to.have.property('isSchool');
    expect(test1.body).to.have.property('slug');
  });

  it(config.TEST_ERROR_DELETE_NON_EXISTING, async () => {
    const test1 = await chai
      .request(server)
      .delete(`/api/tag/${tag._id}`)
      .send();
    expect(test1).to.have.status(404);
    expect(test1).to.be.a('object');
    expect(test1.body).to.have.property('err');
    expect(test1.body).to.not.have.property('msg');
    expect(test1.body.err).to.be.a('object');
  });

  it(config.TEST_DELETE_EXISTING, async () => {
    const res1 = await chai
      .request(server)
      .post('/api/tag/')
      .send({ name: 'Caltech', isSchool: true });
    const tag = res1.body.tag;
    const test1 = await chai
      .request(server)
      .delete(`/api/tag/${tag._id}`)
      .send();
    expect(test1).to.have.status(200);
    expect(test1).to.be.a('object');
    expect(test1.body).to.not.have.property('err');
    expect(test1.body).to.have.property('msg');
    expect(test1.body.msg).to.be.a('string');
  });
});
