import { Module } from '@nestjs/common';
import { AntifraudController } from './antifraud.controller';
import { AntifraudService } from './antifraud.service';
import { TransactionModule } from './modules/transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';
import { DynamooseModule } from 'nestjs-dynamoose';
import secrets from './config/secrets.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [secrets]
    }),
    DynamooseModule.forRoot({ aws: { region: 'us-east-1' } }),
    TransactionModule
  ],
  controllers: [
    AntifraudController
  ],
  providers: [
    AntifraudService
  ],
})
export class AntifraudModule { }
