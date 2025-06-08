import { Controller } from '@nestjs/common';
import { AntifraudService } from './antifraud.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionPayload, TransactionResult } from './antifraud.model';

@Controller()
export class AntifraudController {
  constructor(private readonly antifraudService: AntifraudService) { }

  @MessagePattern('antifraud-transaction-topic')
  transaction(
    @Payload() payload: TransactionPayload
  ): Promise<TransactionResult> {
    return this.antifraudService.check(payload)
  }
}
