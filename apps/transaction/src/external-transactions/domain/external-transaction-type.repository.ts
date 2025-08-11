import { ExternalTransactionType } from './external-transaction-type.entity';

export const EXTERNAL_TRANSACTION_TYPE_REPOSITORY =
  'ExternalTransactionTypeRepository';

export interface ExternalTransactionTypeRepository {
  findById(id: number): Promise<ExternalTransactionType | undefined>;
}
