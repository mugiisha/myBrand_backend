import request from 'supertest';
import app from '../index';

describe('blog tests', () => {
  let message;
  beforeAll( () => 
  jest.setTimeout(3*100*10000),
  request(app)
  .post('/createblog')
  .send({title: 'keppi', descr: "this is description", author: "keppi", image: "https://res.cloudinary.com/duvzjjfba/image/upload/v1648122306/f13555343a86596a1c7560b2750b71a0_wulghl.jpg"})
  .then(res => {
    message = res.body.message;
    })

  )
  
  describe('create blog', () => {
    let blog, res;
    it('should signup unique user', async() => {
      blog = {title: 'keppi', descr: "this is description", author: "keppi", image: "https://res.cloudinary.com/duvzjjfba/image/upload/v1648122306/f13555343a86596a1c7560b2750b71a0_wulghl.jpg"};
      res = await request(app)
      .post('/createblog')
      .send(blog)
      expect(res.body.message).toContain('successfully');
    })
    it('should not register an existing title', async() => {
      blog = {title: 'keppi', descr: "this is description", author: "keppi", image:"https://res.cloudinary.com/duvzjjfba/image/upload/v1648122306/f13555343a86596a1c7560b2750b71a0_wulghl.jpg" };
      res = await request(app)
      .post('/createblog')
      .send(blog)
      expect(res.body.message).toContain('existing')
    })
    it('should not register if no title', async() => {
        blog = {title: '', descr: "this is description", author: "keppi", image:"https://res.cloudinary.com/duvzjjfba/image/upload/v1648122306/f13555343a86596a1c7560b2750b71a0_wulghl.jpg" };
      res = await request(app)
      .post('/createblog')
      .send(blog)
      expect(res.body.message).toContain('required')
    })
  })
})