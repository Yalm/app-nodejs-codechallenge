import { FindByIdExternalTransactionsUseCaseImpl } from './find-by-id-external-transaction.use-case.impl';
import { ExternalTransactionNotFoundException } from '../../domain/exceptions/external-transaction-not-found.exception';
import { ExternalTransaction } from '../../domain/external-transaction.entity';

describe('FindByIdExternalTransactionsUseCaseImpl', () => {
  const externalTransactionRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    updateStatusById: jest.fn(),
  };

  const useCase = new FindByIdExternalTransactionsUseCaseImpl(
    externalTransactionRepository,
  );

  it('should return external transaction when found', async () => {
    const transaction = new ExternalTransaction(
      '123',
      { id: 1, name: 'Transfer' },
      'account-debit-123',
      'account-credit-456',
      100,
    );
    externalTransactionRepository.findById.mockResolvedValue(transaction);

    const result = await useCase.execute('123');

    expect(externalTransactionRepository.findById).toHaveBeenCalledWith('123');
    expect(result).toBe(transaction);
  });

  it('should throw ExternalTransactionNotFoundException when not found', async () => {
    externalTransactionRepository.findById.mockResolvedValue(undefined);

    await expect(useCase.execute('not-found-id')).rejects.toThrow(
      ExternalTransactionNotFoundException,
    );
    expect(externalTransactionRepository.findById).toHaveBeenCalledWith(
      'not-found-id',
    );
  });
});
