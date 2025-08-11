import { DomainEvent } from '@app/common';

export class ExternalTransactionCreatedEvent extends DomainEvent {
  constructor(
    private readonly id: string,
    private readonly amount: number,
  ) {
    super('external_transactions.created');
  }

  toPrimitives() {
    return { id: this.id, amount: this.amount };
  }
}
