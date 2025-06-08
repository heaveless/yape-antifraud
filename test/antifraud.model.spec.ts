import { TransactionPayload } from '@/antifraud.model';

describe('TransactionPayload DTO', () => {
  it('should create an instance with correct values', () => {
    const payload = new TransactionPayload();
    payload.id = 'tx-001';
    payload.amount = 500;

    expect(payload).toBeInstanceOf(TransactionPayload);
    expect(payload.id).toBe('tx-001');
    expect(payload.amount).toBe(500);
  });
});