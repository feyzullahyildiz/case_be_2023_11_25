import { BaseTransactionService } from './base-transaction.service';

/* eslint-disable no-unused-vars */
interface IRate {
  [key: string]: number;
}
export abstract class BaseCurrencyService {
  constructor(public readonly transactionService: BaseTransactionService) {}
  abstract getRate(source: string, targets: string[]): Promise<IRate>;

  async convert(amount: number, source: string, targets: string[]) {
    const rates = await this.getRate(source, targets);
    const keys = Object.keys(rates);
    const amounts = keys.reduce((obj, key) => {
      obj[key] = rates[key] * amount;
      return obj;
    }, {} as IRate);
    const transaction_id = await this.transactionService.set({
      source,
      amounts,
    });
    return {
      rates,
      amounts,
      transaction_id,
    };
  }
}
