import { createApp } from '../src/app';
import { BaseCurrencyService } from '../src/services/base-currency.service';
interface Opt {
  getRate: jest.Mock;
}
export const createMockApp = (opt: Opt) => {
  class Mock extends BaseCurrencyService {
    getRate = opt.getRate;
  }
  return createApp(new Mock());
};
