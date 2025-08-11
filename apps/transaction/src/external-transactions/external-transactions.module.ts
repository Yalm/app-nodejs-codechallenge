import { Module } from '@nestjs/common';
import { EVENT_BUS, KafkaEventBus } from '@app/common';
import { ExternalTransactionsController } from './infrastructure/external-transactions.controller';
import { EXTERNAL_TRANSACTION_REPOSITORY } from './domain/external-transaction.repository';
import { FindByIdExternalTransactionsUseCaseImpl } from './application/use-cases/find-by-id-external-transaction.use-case.impl';
import { CreateExternalTransactionsUseCaseImpl } from './application/use-cases/create-external-transaction-use-case.impl';
import { EXTERNAL_TRANSACTION_TYPE_REPOSITORY } from './domain/external-transaction-type.repository';
import { CREATE_EXTERNAL_TRANSACTIONS_USE_CASE } from './application/use-cases/create-external-transaction.use-case';
import { FIND_BY_ID_EXTERNAL_TRANSACTIONS_USE_CASE } from './application/use-cases/find-by-id-external-transaction.use-case';
import { UPDATE_STATUS_EXTERNAL_TRANSACTIONS_USE_CASE } from './application/use-cases/update-status-external-transaction.use-case';
import { UpdateStatusExternalTransactionsUseCaseImpl } from './application/use-cases/update-status-external-transaction-use-case.impl';
import { MongoDBModule } from './infrastructure/modules/mongodb.module';
import { MemoryExternalTransactionTypeRepository } from './infrastructure/persistence/memory-external-transaction-type.repository';
import { MongodbExternalTransactionRepository } from './infrastructure/persistence/mongodb-external-transaction.repository';
import { KafkaExternalTransactionsConsumer } from './infrastructure/messaging/kafka-external-transactions.consumer';

@Module({
  imports: [MongoDBModule],
  controllers: [ExternalTransactionsController],
  providers: [
    {
      provide: EXTERNAL_TRANSACTION_REPOSITORY,
      useClass: MongodbExternalTransactionRepository,
    },
    {
      provide: EXTERNAL_TRANSACTION_TYPE_REPOSITORY,
      useClass: MemoryExternalTransactionTypeRepository,
    },
    {
      provide: EVENT_BUS,
      useClass: KafkaEventBus,
    },
    {
      provide: CREATE_EXTERNAL_TRANSACTIONS_USE_CASE,
      useClass: CreateExternalTransactionsUseCaseImpl,
    },
    {
      provide: UPDATE_STATUS_EXTERNAL_TRANSACTIONS_USE_CASE,
      useClass: UpdateStatusExternalTransactionsUseCaseImpl,
    },
    {
      provide: FIND_BY_ID_EXTERNAL_TRANSACTIONS_USE_CASE,
      useClass: FindByIdExternalTransactionsUseCaseImpl,
    },
    KafkaExternalTransactionsConsumer,
  ],
})
export class ExternalTransactionsModule {}
