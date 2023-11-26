/* eslint-disable no-unused-vars */
export interface Payload {
  source: string;
  amounts: {
    [key: string]: number;
  };
}
export abstract class BaseTransactionService {
  abstract set(payload: Payload): Promise<string>;
  abstract get(id: string): Promise<Payload>;
}
