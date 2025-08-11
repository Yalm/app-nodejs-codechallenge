import { CreateExternalTransactionsUseCaseImpl } from './create-external-transaction-use-case.impl';
import { ExternalTransactionTypeNotFoundException } from '../../domain/exceptions/external-transaction-type-not-found.exception';
import { ExternalTransactionCreatedEvent } from '../../domain/events';
import { ExternalTransaction } from '../../domain/external-transaction.entity';

describe('CreateExternalTransactionsUseCaseImpl', () => {
  const eventBus = { publish: jest.fn() };
  const externalTransactionRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    updateStatusById: jest.fn(),
  };
  const externalTransactionTypeRepository = { findById: jest.fn() };
  const useCase = new CreateExternalTransactionsUseCaseImpl(
    eventBus,
    externalTransactionRepository,
    externalTransactionTypeRepository,
  );

  const dto = {
    tranferTypeId: 1,
    accountExternalIdDebit: 'debit-id',
    accountExternalIdCredit: 'credit-id',
    value: 100,
  };

  it('should throw ExternalTransactionTypeNotFoundException if transaction type not found', async () => {
    externalTransactionTypeRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(dto)).rejects.toThrow(
      ExternalTransactionTypeNotFoundException,
    );
    expect(externalTransactionTypeRepository.findById).toHaveBeenCalledWith(
      dto.tranferTypeId,
    );
  });

  it('should create external transaction and publish event', async () => {
    const transactionType = { id: 'type-id', name: 'TypeName' };
    externalTransactionTypeRepository.findById.mockResolvedValue(
      transactionType,
    );
    externalTransactionRepository.create.mockResolvedValue(undefined);

    const result = await useCase.execute(dto);

    expect(externalTransactionTypeRepository.findById).toHaveBeenCalledWith(
      dto.tranferTypeId,
    );
    expect(externalTransactionRepository.create).toHaveBeenCalledWith(
      expect.any(ExternalTransaction),
    );
    expect(eventBus.publish).toHaveBeenCalledWith(
      expect.any(ExternalTransactionCreatedEvent),
    );
    expect(result).toBeInstanceOf(ExternalTransaction);
    expect(result.accountExternalIdDebit).toBe(dto.accountExternalIdDebit);
    expect(result.accountExternalIdCredit).toBe(dto.accountExternalIdCredit);
    expect(result.value).toBe(dto.value);
    expect(result.transactionType.id).toBe(transactionType.id);
    expect(result.transactionType.name).toBe(transactionType.name);
  });
});
