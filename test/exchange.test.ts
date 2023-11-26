import type { Express } from 'express';
import { createApp } from '../src/app';
import request from 'supertest';
describe('test', () => {
  let app: Express;
  beforeEach(() => {
    app = createApp({ getRate: () => Promise.resolve({}) });
  });
  it('should list rates', async () => {
    const res = await request(app).get('/api/exchange/rate');
    expect(res.status).toBe(200);
  });
});
