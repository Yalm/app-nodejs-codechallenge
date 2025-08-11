import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  EXTERNAL_TRANSACTION_REPOSITORY,
  type ExternalTransactionRepository,
} from '../../domain/external-transaction.repository';
import { ExternalTransactionStatus } from '../../domain/external-transaction.entity';
import { ExternalTransactionNotFoundException } from '../../domain/exceptions/external-transaction-not-found.exception';
import { UpdateStatusExternalTransactionsUseCase } from './update-status-external-transaction.use-case';
import { CACHE_MANAGER, type Cache } from '@nestjs/cache-manager';

@Injectable()
export class UpdateStatusExternalTransactionsUseCaseImpl
  implements UpdateStatusExternalTransactionsUseCase
{
  private readonly logger = new Logger(
    UpdateStatusExternalTransactionsUseCaseImpl.name,
  );

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @Inject(EXTERNAL_TRANSACTION_REPOSITORY)
    private readonly externalTransactionRepository: ExternalTransactionRepository,
  ) {}

  async execute(id: string, status: ExternalTransactionStatus): Promise<void> {
    this.logger.debug(`Updating status from ${id} to ${status}`);
    const externalTransaction =
      await this.externalTransactionRepository.findById(id);

    if (!externalTransaction) {
      this.logger.warn(`External transaction with id ${id} not found`);
      throw new ExternalTransactionNotFoundException();
    }

    await this.externalTransactionRepository.updateStatusById(id, { status });
    this.logger.debug(`Status updated for external transaction ${id}`);

    await this.cacheManager.del(`/external-transactions/${id}`);
    this.logger.debug(`Cache cleared for external transaction ${id}`);
  }
}
