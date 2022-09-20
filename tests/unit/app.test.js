//write an HTTP unit test using supertest to cover this 404 handler
// write a test that causes a 404 to occur

// tests/unit/app.test.js
const request = require('supertest');
const app = require('../../src/app');

describe('App', () => {
  test('404 handler', async () => {
    const response = await request(app).get('/does-not-exist');
    expect(response.status).toBe(404);
  });
});
