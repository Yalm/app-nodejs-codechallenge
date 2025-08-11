import { ValidateExternalTransactionDto } from '../dtos/validate-external-transaction.dto';

export interface ValidateExternalTransactionUseCase {
  execute(dto: ValidateExternalTransactionDto): Promise<void>;
}

export const VALIDATE_EXTERNAL_TRANSACTION_USE_CASE =
  'VALIDATE_EXTERNAL_TRANSACTION_USE_CASE';
