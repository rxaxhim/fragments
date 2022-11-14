const request = require('supertest');
const app = require('../../src/app');

describe('POST /v1/fragments', () => {
  test('should return a success response if a fragment is created with an id', async () => {
    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .send({ body: 'test body' })
      .set({ id: '1234', contentType: 'text/plain' });
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('ok');
    expect(Array.isArray(res.body.fragments)).toBe(false);
  });

  test('should return a success response if a fragment is created', async () => {
    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .send('test body')
      .set('Content-Type', 'text/plain');
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('ok');
    expect(Array.isArray(res.body.fragments)).toBe(false);
  });
});
