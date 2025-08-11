import { SubscribeTo } from 'nestjs-kafkajs';
import { Inject, Injectable } from '@nestjs/common';
import {
  UPDATE_STATUS_EXTERNAL_TRANSACTIONS_USE_CASE,
  type UpdateStatusExternalTransactionsUseCase,
} from '../../application/use-cases/update-status-external-transaction.use-case';
import { ExternalTransactionStatusValidatedDto } from '../../application/dtos/external-transaction-status-validated.dto';

@Injectable()
export class KafkaExternalTransactionsConsumer {
  constructor(
    @Inject(UPDATE_STATUS_EXTERNAL_TRANSACTIONS_USE_CASE)
    private readonly updateStatusExternalTransactionUseCase: UpdateStatusExternalTransactionsUseCase,
  ) {}

  @SubscribeTo('external_transactions.validated')
  handleExternalTransactionValidated(
    message: ExternalTransactionStatusValidatedDto,
  ) {
    return this.updateStatusExternalTransactionUseCase.execute(
      message.id,
      message.status,
    );
  }
}
