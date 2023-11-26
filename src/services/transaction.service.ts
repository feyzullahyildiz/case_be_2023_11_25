import { v4 as uuidv4 } from 'uuid';
import { BaseTransactionService, Payload } from './base-transaction.service';

export class TransactionService extends BaseTransactionService {
  private readonly map = new Map<string, Payload>();
  async set(payload: Payload): Promise<string> {
    const id = uuidv4();
    this.map.set(id, payload);
    return id;
  }
  async get(id: string): Promise<Payload> {
    return this.map.get(id)!;
  }
}
