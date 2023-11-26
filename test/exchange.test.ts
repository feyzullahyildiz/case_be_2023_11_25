import type { Express } from 'express';
import request from 'supertest';
import { ResponseBodyError } from '../src/error/response-body.error';
import { createMockApp } from './test.util';

describe('test Error Responses', () => {
  it('it should give ResponseBodyError', async () => {
    const errResponse = { foo: 'BAR' };
    const app = createMockApp({
      getRate: jest.fn(() => Promise.reject(new ResponseBodyError(errResponse))),
    });
    const res = await request(app).get(`/api/exchange/rate`).query({ source: 'USD', targets: 'TRL,EUR' });
    expect(res.status).toEqual(400);
    expect(res.body).toMatchObject(errResponse);
  });
  it('it should give default Error with its message', async () => {
    const app = createMockApp({
      getRate: jest.fn(() => Promise.reject(new Error('MY ERR MESSAGE'))),
    });
    const res = await request(app).get(`/api/exchange/rate`).query({ source: 'USD', targets: 'TRL,EUR' });
    expect(res.body.message).toBe('MY ERR MESSAGE');
    expect(res.statusCode).toBe(500);
  });
  it('it should give default Error with default error message', async () => {
    const app = createMockApp({
      getRate: jest.fn(() => Promise.reject(new Error())),
    });
    const res = await request(app).get(`/api/exchange/rate`).query({ source: 'USD', targets: 'TRL,EUR' });
    expect(res.body.message).toBe('Unknown error');
    expect(res.statusCode).toBe(500);
  });
});

describe('test /api/exchange/rate', () => {
  let app: Express;
  const getRate = jest.fn(() => Promise.resolve({ TRL: 28, EUR: 0.95 }));
  beforeEach(() => {
    app = createMockApp({ getRate });
  });
  describe('it should not call getRateFn with invalid params', () => {
    it('without params', async () => {
      const res = await request(app).get('/api/exchange/rate');
      expect(getRate).toHaveBeenCalledTimes(0);
      expect(res.status).toBe(400);
    });
    it('without targets', async () => {
      const res = await request(app).get('/api/exchange/rate').query({ source: 'USD' });
      expect(getRate).toHaveBeenCalledTimes(0);
      expect(res.status).toBe(400);
    });
    it('without source', async () => {
      const res = await request(app).get('/api/exchange/rate').query({ targets: 'TRL,EUR' });
      expect(getRate).toHaveBeenCalledTimes(0);
      expect(res.status).toBe(400);
    });
  });
  it('should call getRateFunction', async () => {
    const res = await request(app).get(`/api/exchange/rate`).query({ source: 'USD', targets: 'TRL,EUR' });
    expect(res.status).toBe(200);
    expect(getRate).toHaveBeenCalledTimes(1);
    expect(getRate).toHaveBeenCalledWith('USD', ['TRL', 'EUR']);
    expect(res.body).toHaveProperty('success');
    expect(res.body).toHaveProperty('data');
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('TRL');
    expect(res.body.data).toHaveProperty('EUR');
    expect(res.body.data.TRL).toBe(28);
    expect(res.body.data.EUR).toBe(0.95);
  });
});
describe('test /api/exchange/amount', () => {
  let app: Express;
  const transactionId = '174d42f4-88b2-4440-a628-0452100fd859';
  const getRate = jest.fn(() => Promise.resolve({ TRL: 28, EUR: 0.95 }));
  const setTransaction = jest.fn(() => Promise.resolve(transactionId));
  beforeEach(() => {
    app = createMockApp({ getRate, setTransaction });
  });
  describe('it should not call getRateFn with invalid params', () => {
    it('without params, amount', async () => {
      const res = await request(app).get('/api/exchange/amount');
      expect(getRate).toHaveBeenCalledTimes(0);
      expect(res.status).toBe(400);
    });
    it('without targets, amount', async () => {
      const res = await request(app).get('/api/exchange/amount').query({ source: 'USD' });
      expect(getRate).toHaveBeenCalledTimes(0);
      expect(res.status).toBe(400);
    });
    it('without source, amount', async () => {
      const res = await request(app).get('/api/exchange/amount').query({ targets: 'TRL,EUR' });
      expect(getRate).toHaveBeenCalledTimes(0);
      expect(res.status).toBe(400);
    });
    it('without amount', async () => {
      const res = await request(app).get('/api/exchange/amount').query({ source: 'USD', targets: 'TRL,EUR' });
      expect(getRate).toHaveBeenCalledTimes(0);
      expect(res.status).toBe(400);
    });
  });
  describe('calculate amount', () => {
    it('should calc amount and return transaction_id', async () => {
      const res = await request(app)
        .get('/api/exchange/amount')
        .query({ source: 'USD', targets: 'TRL,EUR', amount: 5 });
      expect(getRate).toHaveBeenCalledTimes(1);
      expect(setTransaction).toHaveBeenCalledTimes(1);
      expect(setTransaction).toHaveBeenCalledWith({
        source: 'USD',
        amounts: { TRL: 140, EUR: 4.75 },
      });
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        success: true,
        data: {
          amounts: { TRL: 140, EUR: 4.75 },
          rates: { TRL: 28, EUR: 0.95 },
          transaction_id: transactionId,
        },
      });
    });
  });
});
