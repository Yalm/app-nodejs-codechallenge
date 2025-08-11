import { Module } from '@nestjs/common';
import { EVENT_BUS, KafkaEventBus } from '@app/common';
import { KafkaExternalTransactionsConsumer } from './infrastructure/messaging/kafka-external-transacions.consumer';
import { VALIDATE_EXTERNAL_TRANSACTION_USE_CASE } from './application/use-cases/validate-external-transaction.use-case';
import { ValidateExternalTransactionUseCaseImpl } from './application/use-cases/validate-external-transaction-use-case.impl';

@Module({
  providers: [
    KafkaExternalTransactionsConsumer,
    {
      provide: VALIDATE_EXTERNAL_TRANSACTION_USE_CASE,
      useClass: ValidateExternalTransactionUseCaseImpl,
    },
    {
      provide: EVENT_BUS,
      useClass: KafkaEventBus,
    },
  ],
})
export class TransactionsModule {}
