import { AggregateRoot } from '@app/common';
import { v4 as uuidv4 } from 'uuid';
import { ExternalTransactionType } from './external-transaction-type.entity';

export enum ExternalTransactionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

type ExternalTransactionTypeInfo = Pick<ExternalTransactionType, 'id' | 'name'>;

export class ExternalTransaction extends AggregateRoot {
  static readonly DEFAULT_STATUS = ExternalTransactionStatus.PENDING;

  constructor(
    readonly id: string = uuidv4(),
    readonly transactionType: ExternalTransactionTypeInfo,
    readonly accountExternalIdDebit: string,
    readonly accountExternalIdCredit: string,
    readonly value: number,
    readonly status: ExternalTransactionStatus = ExternalTransaction.DEFAULT_STATUS,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date(),
  ) {
    super();
  }

  toPrimitives() {
    return {
      id: this.id,
      transactionType: this.transactionType,
      accountExternalIdDebit: this.accountExternalIdDebit,
      accountExternalIdCredit: this.accountExternalIdCredit,
      value: this.value,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
