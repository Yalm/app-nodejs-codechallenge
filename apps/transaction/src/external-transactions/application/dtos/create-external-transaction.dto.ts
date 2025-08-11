import { IsUUID, IsNumber, IsInt } from 'class-validator';

export class CreateExternalTransactionDto {
  @IsUUID()
  accountExternalIdDebit: string;

  @IsUUID()
  accountExternalIdCredit: string;

  @IsInt()
  tranferTypeId: number;

  @IsNumber()
  value: number;
}
