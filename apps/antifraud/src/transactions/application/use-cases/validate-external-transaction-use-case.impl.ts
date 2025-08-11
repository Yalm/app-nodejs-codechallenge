import { Inject, Injectable, Logger } from '@nestjs/common';
import { ValidateExternalTransactionUseCase } from './validate-external-transaction.use-case';
import { EVENT_BUS, type EventBus } from '@app/common';
import { ValidateExternalTransactionDto } from '../dtos/validate-external-transaction.dto';
import { Transaction } from '../../domain/transaction.entity';
import { ExternalTransactionValidadedEvent } from '../../domain/events';

@Injectable()
export class ValidateExternalTransactionUseCaseImpl
  implements ValidateExternalTransactionUseCase
{
  private readonly logger = new Logger(
    ValidateExternalTransactionUseCaseImpl.name,
  );

  constructor(@Inject(EVENT_BUS) private readonly eventBus: EventBus) {}

  execute(dto: ValidateExternalTransactionDto): Promise<void> {
    this.logger.debug('Validating external transaction', dto);
    const transaction = new Transaction(dto.id, dto.amount);
    transaction.validateAmount();
    return this.eventBus.publish(
      new ExternalTransactionValidadedEvent(transaction.id, transaction.status),
    );
  }
}
