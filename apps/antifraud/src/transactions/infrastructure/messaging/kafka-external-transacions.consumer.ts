import { SubscribeTo } from 'nestjs-kafkajs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ValidateExternalTransactionDto } from '../../application/dtos/validate-external-transaction.dto';
import {
  VALIDATE_EXTERNAL_TRANSACTION_USE_CASE,
  type ValidateExternalTransactionUseCase,
} from '../../application/use-cases/validate-external-transaction.use-case';

@Injectable()
export class KafkaExternalTransactionsConsumer {
  private readonly logger = new Logger(KafkaExternalTransactionsConsumer.name);

  constructor(
    @Inject(VALIDATE_EXTERNAL_TRANSACTION_USE_CASE)
    private readonly validateExternalTransactionUseCase: ValidateExternalTransactionUseCase,
  ) {}

  @SubscribeTo('external_transactions.created')
  async handleExternalTransactionCreated(
    event: ValidateExternalTransactionDto,
  ) {
    this.logger.debug('Handle External Transaction Created:', event);
    await this.validateExternalTransactionUseCase.execute(event);
  }
}
