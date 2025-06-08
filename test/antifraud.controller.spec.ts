import { Test, TestingModule } from '@nestjs/testing';
import { AntifraudController } from '@/antifraud.controller';
import { AntifraudService } from '@/antifraud.service';
import { TransactionPayload } from '@/antifraud.model';

describe('AntifraudController', () => {
    let controller: AntifraudController;
    let antifraudService: AntifraudService;

    const mockAntifraudService = {
        check: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AntifraudController],
            providers: [
                {
                    provide: AntifraudService,
                    useValue: mockAntifraudService,
                },
            ],
        }).compile();

        controller = module.get<AntifraudController>(AntifraudController);
        antifraudService = module.get<AntifraudService>(AntifraudService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('transaction', () => {
        it('should delegate to antifraudService.check and return void', async () => {
            const payload: TransactionPayload = {
                id: 'tx-001',
                amount: 250,
            };

            mockAntifraudService.check.mockResolvedValue(undefined);

            const result = await controller.transaction(payload);

            expect(mockAntifraudService.check).toHaveBeenCalledWith(payload);
            expect(result).toBeUndefined();
        });
    });
});