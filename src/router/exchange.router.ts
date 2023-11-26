import { Router } from 'express';
import { BaseCurrencyService } from '../services/base-currency.service';
import { createExchangeController } from '../controller';

export const createExchangeRouter = (currencyService: BaseCurrencyService) => {
  const router = Router();
  const controller = createExchangeController(currencyService);
  router.get('/rate', controller.rate);
  router.get('/amount');
  router.get('/list');

  return router;
};
