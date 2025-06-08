import { Injectable } from "@nestjs/common";
import { TransactionProvider } from "./transaction.provider";
import { TransactionArgs, TransactionReturn } from "./transaction.model";

@Injectable()
export class TransactionService {
    constructor(
        private readonly transactionProvider: TransactionProvider
    ) { }

    async update(
        args: TransactionArgs
    ): Promise<TransactionReturn> {
        await this.transactionProvider.update({ id: args.id }, { statusId: args.statusId });
    }
}