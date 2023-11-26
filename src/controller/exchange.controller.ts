import { RequestHandler } from 'express';
import { BaseCurrencyService } from '../services/base-currency.service';

export const createExchangeController = (currencyService: BaseCurrencyService) => {
  const rate: RequestHandler = async (req, res, next) => {
    try {
      const result = await currencyService.getRate('USD', ['EUR']);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  return {
    rate,
  };
};
