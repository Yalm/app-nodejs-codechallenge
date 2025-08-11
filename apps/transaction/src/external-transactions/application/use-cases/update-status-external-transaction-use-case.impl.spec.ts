import { UpdateStatusExternalTransactionsUseCaseImpl } from './update-status-external-transaction-use-case.impl';
import { ExternalTransactionStatus } from '../../domain/external-transaction.entity';
import { ExternalTransactionNotFoundException } from '../../domain/exceptions/external-transaction-not-found.exception';

describe('UpdateStatusExternalTransactionsUseCaseImpl', () => {
  const externalTransactionRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    updateStatusById: jest.fn(),
  };

  const useCase = new UpdateStatusExternalTransactionsUseCaseImpl(
    externalTransactionRepository,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update status when external transaction exists', async () => {
    const id = 'tx123';
    const status = ExternalTransactionStatus.APPROVED;
    externalTransactionRepository.findById.mockResolvedValue({
      id,
      status: ExternalTransactionStatus.PENDING,
    });
    externalTransactionRepository.updateStatusById.mockResolvedValue(undefined);

    await expect(useCase.execute(id, status)).resolves.toBeUndefined();
    expect(externalTransactionRepository.findById).toHaveBeenCalledWith(id);
    expect(externalTransactionRepository.updateStatusById).toHaveBeenCalledWith(
      id,
      { status },
    );
  });

  it('should throw ExternalTransactionNotFoundException when transaction does not exist', async () => {
    const id = 'tx404';
    const status = ExternalTransactionStatus.APPROVED;
    externalTransactionRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(id, status)).rejects.toBeInstanceOf(
      ExternalTransactionNotFoundException,
    );
    expect(externalTransactionRepository.findById).toHaveBeenCalledWith(id);
    expect(
      externalTransactionRepository.updateStatusById,
    ).not.toHaveBeenCalled();
  });
});
