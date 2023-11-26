import type { Express } from 'express';
import { createApp } from '../src/app';
import request from 'supertest';
import { ResponseBodyError } from '../src/error/response-body.error';

describe('Error Responses', () => {
  it('it should give ResponseBodyError', async () => {
    const errResponse = { foo: 'BAR' };
    const app = createApp({
      getRate: jest.fn(() => Promise.reject(new ResponseBodyError(errResponse))),
    });
    const res = await request(app).get(`/api/exchange/rate`).query({ source: 'USD', targets: 'TRL,EUR' });
    expect(res.status).toEqual(400);
    expect(res.body).toMatchObject(errResponse);
  });
  it('it should give default Error with its message', async () => {
    const app = createApp({
      getRate: jest.fn(() => Promise.reject(new Error('MY ERR MESSAGE'))),
    });
    const res = await request(app).get(`/api/exchange/rate`).query({ source: 'USD', targets: 'TRL,EUR' });
    expect(res.body.message).toBe('MY ERR MESSAGE');
    expect(res.statusCode).toBe(500);
  });
  it('it should give default Error with default error message', async () => {
    const app = createApp({
      getRate: jest.fn(() => Promise.reject(new Error())),
    });
    const res = await request(app).get(`/api/exchange/rate`).query({ source: 'USD', targets: 'TRL,EUR' });
    expect(res.body.message).toBe('Unknown error');
    expect(res.statusCode).toBe(500);
  });
});

describe('test app', () => {
  let app: Express;
  const getRateFn = jest.fn(() => Promise.resolve({}));
  beforeEach(() => {
    app = createApp({
      getRate: getRateFn,
    });
  });
  describe('it should not call getRateFn with invalid params', () => {
    it('without params', async () => {
      const res = await request(app).get('/api/exchange/rate');
      expect(getRateFn).toHaveBeenCalledTimes(0);
      expect(res.status).toBe(400);
    });
    it('without targets', async () => {
      const res = await request(app).get('/api/exchange/rate').query({ source: 'USD' });
      expect(getRateFn).toHaveBeenCalledTimes(0);
      expect(res.status).toBe(400);
    });
    it('without source', async () => {
      const res = await request(app).get('/api/exchange/rate').query({ targets: 'TRL,EUR' });
      expect(getRateFn).toHaveBeenCalledTimes(0);
      expect(res.status).toBe(400);
    });
  });
  it('should call getRateFunction', async () => {
    const res = await request(app).get(`/api/exchange/rate`).query({ source: 'USD', targets: 'TRL,EUR' });
    expect(res.status).toBe(200);
    expect(getRateFn).toHaveBeenCalledTimes(1);
    expect(getRateFn).toHaveBeenCalledWith('USD', ['TRL', 'EUR']);
    expect(res.body).toHaveProperty('success');
    expect(res.body).toHaveProperty('data');
    expect(res.body.success).toBe(true);
  });
});
