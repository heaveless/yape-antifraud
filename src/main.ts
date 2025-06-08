import { NestFactory } from '@nestjs/core';
import { AntifraudModule } from './antifraud.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AntifraudModule, {
    logger: new ConsoleLogger({
      prefix: 'Yape',
      json: true,
      colors: true
    }),
  });

  const config = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'ms-antifraud',
        brokers: config.get<Array<string>>('antifraud.KAFKA_BROKERS', [])
      },
      consumer: {
        groupId: 'gp-antifraud-transaction',
      }
    }
  });

  await app.startAllMicroservices();
}
bootstrap();
