import { Module } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { TransactionProvider } from "./transaction.provider";
import { DynamooseModule } from "nestjs-dynamoose";
import { INJECT_TRANSACTION_MODEL } from "./transaction.constant";
import { TransactionSchema } from "./transaction.schema";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        DynamooseModule.forFeatureAsync([{
            name: INJECT_TRANSACTION_MODEL,
            useFactory: (_, configService: ConfigService) => ({
                schema: TransactionSchema,
                options: {
                    tableName: configService.get<string>('transaction.DYNAMO_TABLE_TRANSACTION'),
                    create: false,
                    waitForActive: false
                },
            }),
            inject: [ConfigService]
        }]),
    ],
    providers: [
        TransactionService,
        TransactionProvider
    ],
    exports: [
        TransactionService
    ]
})
export class TransactionModule { }
