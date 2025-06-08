import { TransactionStatus } from '@/antifraud.util';

describe('TransactionStatus Enum', () => {
    it('should have correct enum values', () => {
        expect(TransactionStatus.PENDING).toBe(0);
        expect(TransactionStatus.APPROVED).toBe(1);
        expect(TransactionStatus.REJECTED).toBe(2);
    });

    it('should map number to correct string name', () => {
        expect(TransactionStatus[0]).toBe('PENDING');
        expect(TransactionStatus[1]).toBe('APPROVED');
        expect(TransactionStatus[2]).toBe('REJECTED');
    });
});