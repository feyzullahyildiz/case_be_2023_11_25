import { Router } from 'express';
import { BaseCurrencyService } from '../services/base-currency.service';
import { createExchangeController } from '../controller';
import { createExchangeValidatorMiddlewares } from '../middlewares';

export const createExchangeRouter = (currencyService: BaseCurrencyService) => {
  const router = Router();
  const validators = createExchangeValidatorMiddlewares();
  const controller = createExchangeController(currencyService);
  router.get('/rate', validators.rate, controller.rate);
  router.get('/amount', validators.amount, controller.amount);
  router.get('/list');

  return router;
};
