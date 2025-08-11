import { AggregateRoot } from '@app/common';

export class ExternalTransactionType extends AggregateRoot {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly description?: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date,
  ) {
    super();
  }

  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
