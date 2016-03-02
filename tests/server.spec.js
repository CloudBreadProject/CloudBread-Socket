import request from 'supertest';
import server from 'server';

describe('Server', () => {
  it('is a object', () => {
    expect(server).to.be.an('object');
  });

  it('says hello worlds!', done => {
    request(server)
      .get('/')
      .expect(200, done);
  });
});
