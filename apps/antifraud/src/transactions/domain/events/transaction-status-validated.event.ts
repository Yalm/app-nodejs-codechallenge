import { DomainEvent } from '@app/common';

export class ExternalTransactionValidadedEvent extends DomainEvent {
  constructor(
    private readonly id: string,
    private readonly status: string,
  ) {
    super('external_transactions.validated');
  }

  toPrimitives() {
    return { id: this.id, status: this.status };
  }
}
