import request from 'supertest';
import app from './app';

describe('App', () => {
  it('should handle 404 routes', async () => {
    const response = await request(app).get('/non-existent-route');
    
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Not found' });
  });
});
