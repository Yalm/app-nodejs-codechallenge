import { ExternalTransaction } from '../../domain/external-transaction.entity';

export class ExternalTransactionResponseDto {
  transactionExternalId: string;
  transactionStatus: { name: string };
  transactionType: { name: string };
  value: number;
  createdAt: Date;

  constructor(externalTransaction: ExternalTransaction) {
    this.transactionExternalId = externalTransaction.id;
    this.transactionStatus = { name: externalTransaction.status };
    this.transactionType = { name: externalTransaction.transactionType.name };
    this.value = externalTransaction.value;
    this.createdAt = externalTransaction.createdAt;
  }
}
