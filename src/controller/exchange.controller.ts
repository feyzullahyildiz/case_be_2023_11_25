import { RequestHandler } from 'express';
import { BaseCurrencyService } from '../services/base-currency.service';

type RateRequestHandler = RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown,
  { source: string; targets: Array<string> }
>;
export const createExchangeController = (currencyService: BaseCurrencyService) => {
  const rate: RateRequestHandler = async (req, res, next) => {
    try {
      const { source, targets } = res.locals;
      const data = await currencyService.getRate(source, targets);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  return {
    rate,
  };
};
