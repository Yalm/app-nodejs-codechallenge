import { UpdateStatusExternalTransactionsUseCaseImpl } from './update-status-external-transaction-use-case.impl';
import { ExternalTransactionStatus } from '../../domain/external-transaction.entity';
import { ExternalTransactionNotFoundException } from '../../domain/exceptions/external-transaction-not-found.exception';

describe('UpdateStatusExternalTransactionsUseCaseImpl', () => {
  const externalTransactionRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    updateStatusById: jest.fn(),
  };
  const cacheManager = {
    del: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
    mget: jest.fn(),
    mset: jest.fn(),
    clear: jest.fn(),
    refresh: jest.fn(),
    ttl: jest.fn(),
    mdel: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    disconnect: jest.fn(),
    cacheId: jest.fn(),
    wrap: jest.fn(),
    stores: [],
  };

  const useCase = new UpdateStatusExternalTransactionsUseCaseImpl(
    cacheManager,
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
