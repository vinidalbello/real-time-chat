import request from 'supertest';
import httpServer from '../../app';

describe('Home Routes', () => {
  it('should return a 200 response', async () => {
    const response = await request(httpServer).get('/');
    expect(response.status).toBe(201);
  });

  it('should return a Hello World! message', async () => {
    const response = await request(httpServer).get('/');
    expect(response.body).toBe('Hello World!');
  });
});