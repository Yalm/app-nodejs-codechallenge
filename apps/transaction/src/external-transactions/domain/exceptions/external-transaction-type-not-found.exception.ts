import { DomainException } from '@app/common/domain/domain-exception';

export class ExternalTransactionTypeNotFoundException extends DomainException {
  static readonly CODE = 'EXTERNAL_TRANSACTION_TYPE_NOT_FOUND';

  constructor() {
    super({
      code: ExternalTransactionTypeNotFoundException.CODE,
      message: 'External transaction type not found',
    });
  }
}
