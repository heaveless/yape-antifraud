import { Test, TestingModule } from '@nestjs/testing';
import { AntifraudService } from '@/antifraud.service';
import { ConfigService } from '@nestjs/config';
import { TransactionService } from '@/modules/transaction/transaction.service';
import { TransactionStatus } from '@/antifraud.util';
import { AntifraudArgs } from '@/antifraud.model';

describe('AntifraudService', () => {
    let service: AntifraudService;
    let configService: ConfigService;
    let transactionService: TransactionService;

    const mockConfigService = {
        get: jest.fn(),
    };

    const mockTransactionService = {
        update: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AntifraudService,
                { provide: ConfigService, useValue: mockConfigService },
                { provide: TransactionService, useValue: mockTransactionService },
            ],
        }).compile();

        service = module.get<AntifraudService>(AntifraudService);
        configService = module.get<ConfigService>(ConfigService);
        transactionService = module.get<TransactionService>(TransactionService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('check', () => {
        const basePayload: AntifraudArgs = {
            id: 'tx-123',
            amount: 200,
        };

        it('should approve transaction when amount < maxAmount', async () => {
            mockConfigService.get.mockReturnValue(300);
            mockTransactionService.update.mockResolvedValue(undefined);

            await service.check(basePayload);

            expect(configService.get).toHaveBeenCalledWith('antifraud.MAX_AMOUNT_ALERT', 0);
            expect(transactionService.update).toHaveBeenCalledWith({
                id: 'tx-123',
                statusId: TransactionStatus.APPROVED,
            });
        });

        it('should reject transaction when amount >= maxAmount', async () => {
            mockConfigService.get.mockReturnValue(100);

            await service.check(basePayload);

            expect(transactionService.update).toHaveBeenCalledWith({
                id: 'tx-123',
                statusId: TransactionStatus.REJECTED,
            });
        });
    });
});