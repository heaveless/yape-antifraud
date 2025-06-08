import { Injectable, Logger } from "@nestjs/common";
import { InjectModel, Model } from "nestjs-dynamoose";
import { Transaction, TransactionKey } from "./transaction.model";
import { INJECT_TRANSACTION_MODEL } from "./transaction.constant";

@Injectable()
export class TransactionProvider {
    private readonly logger = new Logger(TransactionProvider.name);

    constructor(
        @InjectModel(INJECT_TRANSACTION_MODEL)
        private readonly transactionModel: Model<Transaction, TransactionKey>,
    ) { }

    update(key: TransactionKey, transaction: Partial<Transaction>) {
        this.logger.log('sending information to dynamoDb for updating...');

        return this.transactionModel.update(key, transaction);
    }
}