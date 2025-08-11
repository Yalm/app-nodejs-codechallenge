import { ExternalTransaction } from '../../domain/external-transaction.entity';

export interface FindByIdExternalTransactionsUseCase {
  execute(id: string): Promise<ExternalTransaction>;
}

export const FIND_BY_ID_EXTERNAL_TRANSACTIONS_USE_CASE =
  'FIND_BY_ID_EXTERNAL_TRANSACTIONS_USE_CASE';
