import { Module } from '@nestjs/common';
import { ExternalTransactionsModule } from './external-transactions/external-transactions.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkajsModule } from 'nestjs-kafkajs';
import configuration from './config/configuration';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    KafkajsModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        client: {
          clientId: configService.get('kafka.clientId'),
          brokers: configService.get('kafka.brokers'),
        },
        consumer: { groupId: configService.get('kafka.groupId') },
      }),
      inject: [ConfigService],
    }),
    CacheModule.register({ isGlobal: true }),
    ExternalTransactionsModule,
  ],
})
export class AppModule {}
