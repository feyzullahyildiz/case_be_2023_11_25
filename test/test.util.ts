import { createApp } from '../src/app';
import { BaseCurrencyService } from '../src/services/base-currency.service';
import { BaseTransactionService } from '../src/services/base-transaction.service';
interface Opt {
  getRate: jest.Mock;
  setTransaction?: jest.Mock;
  getTransaction?: jest.Mock;
}
export const createMockApp = (opt: Opt) => {
  class MockTransactionService extends BaseTransactionService {
    set = opt.setTransaction || jest.fn();
    get = opt.setTransaction || jest.fn();
  }
  const ts = new MockTransactionService();
  class Mock extends BaseCurrencyService {
    getRate = opt.getRate;
  }
  return createApp(new Mock(ts));
};
