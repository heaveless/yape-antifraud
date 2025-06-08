import { Injectable } from '@nestjs/common';
import { TransactionService } from './modules/transaction/transaction.service';
import { ConfigService } from '@nestjs/config';
import { TransactionStatus } from './antifraud.util';
import { AntifraudArgs, AntifraudReturn } from './antifraud.model';

@Injectable()
export class AntifraudService {
  constructor(
    private readonly configService: ConfigService,
    private readonly transactionService: TransactionService
  ) { }

  check(args: AntifraudArgs): Promise<AntifraudReturn> {
    const { amount, ...transaction } = args;
    const maxAmount = this.configService.get<number>('', 0);

    let statusId = TransactionStatus.REJECTED;
    if (amount < maxAmount) {
      statusId = TransactionStatus.APPROVED;
    }

    return this.transactionService.update({
      id: transaction.id,
      statusId
    });
  }
}
