import { createApp } from '../app';
import { BaseCurrencyService } from '../services/base-currency.service';
import { BaseTransactionService } from '../services/base-transaction.service';
interface Opt {
  getRate: jest.Mock;
  setTransaction?: jest.Mock;
  getTransaction?: jest.Mock;
}
export const createMockApp = (opt: Opt) => {
  class MockTransactionService extends BaseTransactionService {
    set = opt.setTransaction || jest.fn();
    get = opt.getTransaction || jest.fn();
  }
  const ts = new MockTransactionService();
  class Mock extends BaseCurrencyService {
    getRate = opt.getRate;
  }
  return createApp(new Mock(ts));
};
