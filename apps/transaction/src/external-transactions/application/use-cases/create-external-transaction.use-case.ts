import { ExternalTransaction } from '../../domain/external-transaction.entity';
import { CreateExternalTransactionDto } from '../dtos';

export interface CreateExternalTransactionsUseCase {
  execute(dto: CreateExternalTransactionDto): Promise<ExternalTransaction>;
}

export const CREATE_EXTERNAL_TRANSACTIONS_USE_CASE =
  'CREATE_EXTERNAL_TRANSACTIONS_USE_CASE';
