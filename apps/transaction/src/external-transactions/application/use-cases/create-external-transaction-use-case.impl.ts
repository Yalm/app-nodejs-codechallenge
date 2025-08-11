import { Inject, Injectable, Logger } from '@nestjs/common';
import { EVENT_BUS, type EventBus } from '@app/common';
import {
  EXTERNAL_TRANSACTION_REPOSITORY,
  type ExternalTransactionRepository,
} from '../../domain/external-transaction.repository';
import { ExternalTransaction } from '../../domain/external-transaction.entity';
import { ExternalTransactionCreatedEvent } from '../../domain/events';
import { CreateExternalTransactionDto } from '../dtos';
import {
  EXTERNAL_TRANSACTION_TYPE_REPOSITORY,
  type ExternalTransactionTypeRepository,
} from '../../domain/external-transaction-type.repository';
import { ExternalTransactionTypeNotFoundException } from '../../domain/exceptions/external-transaction-type-not-found.exception';
import { CreateExternalTransactionsUseCase } from './create-external-transaction.use-case';

@Injectable()
export class CreateExternalTransactionsUseCaseImpl
  implements CreateExternalTransactionsUseCase
{
  private readonly logger = new Logger(
    CreateExternalTransactionsUseCaseImpl.name,
  );

  constructor(
    @Inject(EVENT_BUS) private readonly eventBus: EventBus,
    @Inject(EXTERNAL_TRANSACTION_REPOSITORY)
    private readonly externalTransactionRepository: ExternalTransactionRepository,
    @Inject(EXTERNAL_TRANSACTION_TYPE_REPOSITORY)
    private readonly externalTransactionTypeRepository: ExternalTransactionTypeRepository,
  ) {}

  async execute(
    dto: CreateExternalTransactionDto,
  ): Promise<ExternalTransaction> {
    this.logger.debug('Creating external transaction', dto);
    const transactionType =
      await this.externalTransactionTypeRepository.findById(dto.tranferTypeId);
    if (!transactionType) {
      this.logger.warn(
        `Transaction type with id ${dto.tranferTypeId} not found`,
      );
      throw new ExternalTransactionTypeNotFoundException();
    }

    const externalTransaction = new ExternalTransaction(
      undefined,
      { id: transactionType.id, name: transactionType.name },
      dto.accountExternalIdDebit,
      dto.accountExternalIdCredit,
      dto.value,
    );
    await this.externalTransactionRepository.create(externalTransaction);

    await this.eventBus.publish(
      new ExternalTransactionCreatedEvent(
        externalTransaction.id,
        externalTransaction.value,
      ),
    );

    return externalTransaction;
  }
}
