import { Injectable, Logger } from '@nestjs/common';
import { ExternalTransactionTypeRepository } from '../../domain/external-transaction-type.repository';
import { ExternalTransactionType } from '../../domain/external-transaction-type.entity';

@Injectable()
export class MemoryExternalTransactionTypeRepository
  implements ExternalTransactionTypeRepository
{
  private readonly logger = new Logger(
    MemoryExternalTransactionTypeRepository.name,
  );
  private readonly transactions: ExternalTransactionType[] = [
    new ExternalTransactionType(1, 'Transfer'),
    new ExternalTransactionType(2, 'Withdrawal'),
    new ExternalTransactionType(3, 'Deposit'),
  ];

  async findById(id: number): Promise<ExternalTransactionType> {
    this.logger.debug(`Finding transaction type with id ${id}`);
    return this.transactions.find((type) => type.id === id);
  }
}
