import express from 'express';
import { BaseCurrencyService } from './services/base-currency.service';
import { createExchangeRouter } from './router';
import { getDefaultErrorHandler } from './middlewares/default-error.middleware';

export const createApp = (currencyService: BaseCurrencyService) => {
  const app = express();
  app.use(express.json());
  const exchangeRouter = createExchangeRouter(currencyService);

  app.use('/api/exchange', exchangeRouter);

  const errHandler = getDefaultErrorHandler();
  app.use(errHandler);
  return app;
};
