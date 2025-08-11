import { ExternalTransactionStatus } from '../../domain/external-transaction.entity';

export interface UpdateStatusExternalTransactionsUseCase {
  execute(id: string, status: ExternalTransactionStatus): Promise<void>;
}

export const UPDATE_STATUS_EXTERNAL_TRANSACTIONS_USE_CASE =
  'UPDATE_STATUS_EXTERNAL_TRANSACTIONS_USE_CASE';
