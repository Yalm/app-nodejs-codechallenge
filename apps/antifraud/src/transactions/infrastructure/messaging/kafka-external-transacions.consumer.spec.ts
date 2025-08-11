import { KafkaExternalTransactionsConsumer } from './kafka-external-transacions.consumer';
import { Logger } from '@nestjs/common';
import { ValidateExternalTransactionDto } from '../../application/dtos/validate-external-transaction.dto';

describe('KafkaExternalTransactionsConsumer', () => {
  const loggerDebugSpy = jest
    .spyOn(Logger.prototype, 'debug')
    .mockImplementation();

  const validateExternalTransactionUseCase = { execute: jest.fn() };
  const consumer = new KafkaExternalTransactionsConsumer(
    validateExternalTransactionUseCase,
  );

  it('should call logger.debug and validateExternalTransactionUseCase.execute when handleExternalTransactionCreated is called', async () => {
    const event: ValidateExternalTransactionDto = { id: '123', amount: 100 };

    await consumer.handleExternalTransactionCreated(event);

    expect(loggerDebugSpy).toHaveBeenCalledWith(
      'Handle External Transaction Created:',
      event,
    );
    expect(validateExternalTransactionUseCase.execute).toHaveBeenCalledWith(
      event,
    );
  });
});
