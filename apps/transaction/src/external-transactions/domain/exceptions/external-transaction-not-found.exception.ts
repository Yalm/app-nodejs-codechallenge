import { DomainException } from '@app/common/domain/domain-exception';

export class ExternalTransactionNotFoundException extends DomainException {
  static readonly CODE = 'EXTERNAL_TRANSACTION_NOT_FOUND';

  constructor() {
    super({
      code: ExternalTransactionNotFoundException.CODE,
      message: 'External transaction not found',
    });
  }
}
