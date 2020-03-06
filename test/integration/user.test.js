import request from 'supertest';
import expect from 'expect';
import app from '../../app';

describe('User', () => {
  describe('GetUser', () => {
    it('should retrieve all the existing users', (done) => {
      request(app)
        .get('/api/v1/users')
        .expect(200)
        .expect((res) => {
          expect(res.body).toInclude({
            message: 'All users on display',
            status: 'Success'
          });
        })
        .end(done);
    });
  });
});
