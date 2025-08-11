import { MemoryExternalTransactionTypeRepository } from './memory-external-transaction-type.repository';
import { ExternalTransactionType } from '../../domain/external-transaction-type.entity';

describe('MemoryExternalTransactionTypeRepository', () => {
  const repository = new MemoryExternalTransactionTypeRepository();

  it('should return the correct transaction type by id', async () => {
    const type = await repository.findById(1);
    expect(type).toBeInstanceOf(ExternalTransactionType);
    expect(type.id).toBe(1);
    expect(type.name).toBe('Transfer');
  });

  it('should return undefined for a non-existent id', async () => {
    const type = await repository.findById(999);
    expect(type).toBeUndefined();
  });

  it('should return all predefined transaction types', async () => {
    const ids = [1, 2, 3];
    const names = ['Transfer', 'Withdrawal', 'Deposit'];
    for (let i = 0; i < ids.length; i++) {
      const type = await repository.findById(ids[i]);
      expect(type).toBeInstanceOf(ExternalTransactionType);
      expect(type.id).toBe(ids[i]);
      expect(type.name).toBe(names[i]);
    }
  });
});
