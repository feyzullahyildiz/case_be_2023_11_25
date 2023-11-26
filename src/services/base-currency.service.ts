/* eslint-disable no-unused-vars */
interface IRate {
  [key: string]: number;
}
export abstract class BaseCurrencyService {
  abstract getRate(source: string, target: string[]): Promise<IRate>;
}
