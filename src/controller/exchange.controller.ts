import { RequestHandler } from 'express';
import { BaseCurrencyService } from '../services/base-currency.service';
import { NotFoundError } from '../error';

type RateRequestHandler = RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown,
  { source: string; targets: Array<string> }
>;
type AmountRequestHandler = RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown,
  { source: string; targets: Array<string>; amount: number }
>;
type GetListRequestHandler = RequestHandler<unknown, unknown, unknown, unknown, { transaction_id: string }>;
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
  const amount: AmountRequestHandler = async (req, res, next) => {
    try {
      const { source, targets, amount } = res.locals;
      const data = await currencyService.convert(amount, source, targets);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };
  const getList: GetListRequestHandler = async (req, res, next) => {
    try {
      const { transaction_id } = res.locals;
      const data = await currencyService.transactionService.get(transaction_id);
      if (!data) {
        throw new NotFoundError(`Item not found. transaction_id: ${transaction_id}`);
      }
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  return {
    rate,
    amount,
    getList,
  };
};
