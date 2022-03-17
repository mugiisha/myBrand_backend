import request from 'supertest';
import app from '../index';

describe('user tests', () => {
  let token;
  beforeAll( () => 
  jest.setTimeout(3*100*10000),
  request(app)
  .post('/register')
  .send({name: 'mike anguandia', email: "mike@gmail.com", password: "pass123", role: "user"})
  .then(res => {
      token = res.body.token;
    })
    
  )

  describe('test signup', () => {
    let user, res;
    it('should signup unique user', async() => {
      user = {name: 'mike anguandia', email: "mike1@gmail.com", password: "pass123"};
      res = await request(app)
      .post('/register')
      .send(user)
      expect(res.body.message).toContain('successfully');
    })
    it('should not register an existing user', async() => {
      user = {name: 'mike anguandia', email: "mike@gmail.com", password: "pass123"};
      res = await request(app)
      .post('/register')
      .send(user)
      expect(res.body.message).toContain('Exist')
    })
    it('should not register if no email', async() => {
      user = {name: 'mike anguandia', email: "", password: "pass123"};
      res = await request(app)
      .post('/register')
      .send(user)
      expect(res.body.message).toContain('required')
    })
    it('should not register if no name', async() => {
      user = {name: '', email: "mike@mail.com", password: "pass123"};
      res = await request(app)
      .post('/register')
      .send(user)
      expect(res.body.message).toContain('required')
    })
  })
})