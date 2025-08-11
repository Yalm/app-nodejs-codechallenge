import { ValidateExternalTransactionUseCaseImpl } from './validate-external-transaction-use-case.impl';
import { ValidateExternalTransactionDto } from '../dtos/validate-external-transaction.dto';
import { Transaction } from '../../domain/transaction.entity';
import { ExternalTransactionValidadedEvent } from '../../domain/events';

describe('ValidateExternalTransactionUseCaseImpl', () => {
  const eventBus = { publish: jest.fn().mockResolvedValue(undefined) };
  const useCase = new ValidateExternalTransactionUseCaseImpl(eventBus);

  it('should validate transaction and publish event', async () => {
    const dto: ValidateExternalTransactionDto = { id: 'tx123', amount: 100 };
    const validateAmountSpy = jest
      .spyOn(Transaction.prototype, 'validateAmount')
      .mockImplementation();

    await useCase.execute(dto);

    expect(validateAmountSpy).toHaveBeenCalled();
    expect(eventBus.publish).toHaveBeenCalledWith(
      expect.any(ExternalTransactionValidadedEvent),
    );
  });

  it('should propagate errors from eventBus.publish', async () => {
    const dto: ValidateExternalTransactionDto = { id: 'tx999', amount: 50 };
    eventBus.publish.mockRejectedValue(new Error('Publish failed'));

    await expect(useCase.execute(dto)).rejects.toThrow('Publish failed');
  });
});
