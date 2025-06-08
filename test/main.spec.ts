import { Test, TestingModule } from '@nestjs/testing';
import { AntifraudModule } from '@/antifraud.module';

describe('AntifraudModule (integration)', () => {
    it('should compile the module without errors', async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AntifraudModule],
        }).compile();

        expect(module).toBeDefined();
    });
});