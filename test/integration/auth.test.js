/* eslint-disable no-useless-escape */
import request from 'supertest';
import expect from 'expect';
import app from '../../app';


describe('Auth', () => {
  describe('AuthSignup', () => {
    it('Should check for signup with all correct credentials', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({ first_name: 'Ishola', last_name: 'Bala', email: 'adebayo978@yahoo.com', password: 'aljazera', repeat_password: 'aljazera' })
        .expect(201)
        .expect((res) => {
          expect(res.body.data).toInclude({
            first_name: 'Ishola',
            last_name: 'Bala',
          });
          expect(res.body.status).toBe('Success');
        })
        .end(done);
    });

    it('Should return an appropriate error message if a user tries to signup with a missing first_name', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({ last_name: 'Deletr', email: 'daylay134@yahoo.com', password: 'elijrah989', repeat_password: 'elijrah989' })
        .expect(400)
        .expect((res) => {
          expect(res.body.error).toBe('First name field is required');
        })
        .end(done);
    });

    it('Should return an appropriate error message if a user tries to signup with a missing last_name', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({ first_name: 'Ayo', email: 'daylay134@yahoo.com', password: 'elijrah989', repeat_password: 'elijrah989' })
        .expect(400)
        .expect((res) => {
          expect(res.body.error).toBe('Last name field is required');
        })
        .end(done);
    });

    it('Should return an appropriate error message if a user tries to signup with a missing email', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({ first_name: 'Ayo', last_name: 'Deletr', password: 'elijrah989', repeat_password: 'elijrah989' })
        .expect(401)
        .expect((res) => {
          expect(res.body.message).toBe('Email is a required field, please fill in your email');
        })
        .end(done);
    });

    it('Should return an appropriate error message if a user tries to signup with a missing password', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({ first_name: 'Ayo', last_name: 'Deletr', email: 'daylay134@yahoo.com', repeat_password: 'elijrah989' })
        .expect(400)
        .expect((res) => {
          expect(res.body.error).toBe('You need a password to be registered');
        })
        .end(done);
    });

    it('Should return an appropriate error message if a user tries to signup with a missing repeat password', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({ first_name: 'Ayo', last_name: 'Deletr', email: 'daylay134@yahoo.com', password: 'elijrah989' })
        .expect(400)
        .expect((res) => {
          expect(res.body.error).toBe('"password" missing required peer "repeat_password"');
        })
        .end(done);
    });

    it('Should return appropriate error message if a user tries to signup with contrasting password', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({ first_name: 'Kanu', last_name: 'Nwakwo', email: 'kkanuN@gmail.com', password: 'nwoke', repeat_password: 'nwokeee' })
        .expect(400)
        .expect((res) => {
          expect(res.body.error).toBe('\"repeat_password\" must be [ref:password]');
        })
        .end(done);
    });

    it('should return appropriate error when users try signup with an already existing email', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({ first_name: 'Ayokunle', last_name: 'Adebayo', email: 'adebayo978@yahoo.com', password: 'ayoks532', repeat_password: 'ayoks532' })
        .expect(409)
        .expect((res) => {
          expect(res.body.message).toBe('Email already exist, use another email address');
        })
        .end(done);
    });
  });
  describe('AuthLogin', () => {
    it('should check for login with correct credentials', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .send({ email: 'adebayo978@yahoo.com', password: 'aljazera' })
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toBe('Successfully signed in user');
        })
        .end(done);
    });

    it('should check for login with incorrect email', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .send({ email: 'adebayo978@gmail.com', password: 'aljazera' })
        .expect(401)
        .expect((res) => {
          expect(res.body.message).toBe('invalid email/password');
        })
        .end(done);
    });

    it('should check for login with incorrect password', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .send({ email: 'adebayo978@yahoo.com', password: 'aljazeraaaaaaaa' })
        .expect(401)
        .expect((res) => {
          expect(res.body.message).toBe('invalid email/password');
        })
        .end(done);
    });

    it('should check for login with any of the fields missing', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .send({ email: 'adebayo978@yahoo.com' })
        .expect(401)
        .expect((res) => {
          expect(res.body.message).toBe('email/password fields are required');
        })
        .end(done);
    });
  });
});
