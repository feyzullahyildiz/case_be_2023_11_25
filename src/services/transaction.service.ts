import { uuid } from 'uuidv4';
import { BaseTransactionService, Payload } from './base-transaction.service';

export class TransactionService extends BaseTransactionService {
  private readonly map = new Map<string, Payload>();
  async set(payload: Payload): Promise<string> {
    const id = uuid();
    this.map.set(id, payload);
    return id;
  }
  async get(id: string): Promise<Payload> {
    return this.map.get(id)!;
  }
}
