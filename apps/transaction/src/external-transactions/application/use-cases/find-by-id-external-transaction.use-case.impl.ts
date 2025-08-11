import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  EXTERNAL_TRANSACTION_REPOSITORY,
  type ExternalTransactionRepository,
} from '../../domain/external-transaction.repository';
import { ExternalTransactionNotFoundException } from '../../domain/exceptions/external-transaction-not-found.exception';
import { ExternalTransaction } from '../../domain/external-transaction.entity';
import { FindByIdExternalTransactionsUseCase } from './find-by-id-external-transaction.use-case';

@Injectable()
export class FindByIdExternalTransactionsUseCaseImpl
  implements FindByIdExternalTransactionsUseCase
{
  private readonly logger = new Logger(
    FindByIdExternalTransactionsUseCaseImpl.name,
  );

  constructor(
    @Inject(EXTERNAL_TRANSACTION_REPOSITORY)
    private readonly externalTransactionRepository: ExternalTransactionRepository,
  ) {}

  async execute(id: string): Promise<ExternalTransaction> {
    this.logger.debug(`Finding external transaction by ID: ${id}`);

    const externalTransaction =
      await this.externalTransactionRepository.findById(id);

    if (!externalTransaction) {
      this.logger.warn(`External transaction with ID ${id} not found`);
      throw new ExternalTransactionNotFoundException();
    }

    return externalTransaction;
  }
}
