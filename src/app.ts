import express, { ErrorRequestHandler } from 'express';
import { BaseCurrencyService } from './services/base-currency.service';
import { createExchangeRouter } from './router';
import { ResponseBodyError } from './error/response-body.error';

export const createApp = (currencyService: BaseCurrencyService) => {
  const app = express();
  const exchangeRouter = createExchangeRouter(currencyService);

  app.use('/api/exchange', exchangeRouter);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const errHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof ResponseBodyError) {
      res.status(err.statusCode).json(err.body);
      return;
    }
    if (err && err.message) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: 'Unknown error',
    });
  };
  app.use(errHandler);
  return app;
};
