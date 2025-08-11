import { IsUUID, IsEnum } from 'class-validator';
import { ExternalTransactionStatus } from '../../domain/external-transaction.entity';

export class ExternalTransactionStatusValidatedDto {
  @IsUUID()
  id: string;

  @IsEnum(ExternalTransactionStatus)
  status: ExternalTransactionStatus;
}
