import axios, { AxiosInstance } from 'axios';
import { BaseCurrencyService } from './base-currency.service';
import { ResponseBodyError } from '../error/response-body.error';
import { TransactionService } from './transaction.service';
type FixerLatestAPIResponse = {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
};

export class FixerCurrencyService extends BaseCurrencyService {
  private readonly api: AxiosInstance;
  constructor(apiKey: string) {
    if (typeof apiKey !== 'string') {
      throw new Error(`FIXER_API_KEY is NOT provided in env. Value: ${apiKey}`);
    }
    const transactionService = new TransactionService();
    super(transactionService);
    this.api = axios.create({
      baseURL: 'http://data.fixer.io/api',
      params: {
        access_key: apiKey,
      },
    });
  }
  async getRate(source: string, target: string[]) {
    const res = await this.api.get<FixerLatestAPIResponse>('/latest', {
      params: {
        base: source,
        symbols: target.join(','),
      },
    });
    if (!res.data.success) {
      throw new ResponseBodyError(res.data);
    }
    return res.data.rates;
  }
}
