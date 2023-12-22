import { vapidKeys } from "../../services/webpush.service";
import request from 'supertest';
import httpServer from '../../app';

describe('WebPush Routes', () => {
  it('should return a 201 response', async () => {
    const response = await request(httpServer).post('/subscribe');
    expect(response.status).toBe(201);
  });

  it('should return a subscription id', async () => {
    const response = await request(httpServer).post('/subscribe');
    expect(response.body).toHaveProperty('id');
  });

  it('should return a 200 response', async () => {
    const response = await request(httpServer).get('/vapidPublicKey');
    expect(response.status).toBe(200);
  });

  it('should return a vapid public key', async () => {
    const response = await request(httpServer).get('/vapidPublicKey');
    expect(response.text).toBe(vapidKeys.publicKey);
  });
});