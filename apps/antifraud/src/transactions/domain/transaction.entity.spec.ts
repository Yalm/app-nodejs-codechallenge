import { Transaction } from './transaction.entity';

describe('Transaction Entity', () => {
  it('should create a transaction with given id and amount', () => {
    const transaction = new Transaction('tx1', 500);
    expect(transaction.id).toBe('tx1');
    expect(transaction.amount).toBe(500);
    expect(transaction.status).toBeUndefined();
  });

  it('should approve transaction when amount is less than or equal to 1000', () => {
    const transaction = new Transaction('tx2', 1000);
    transaction.validateAmount();
    expect(transaction.status).toBe('approved');
  });

  it('should reject transaction when amount is greater than 1000', () => {
    const transaction = new Transaction('tx3', 1500);
    transaction.validateAmount();
    expect(transaction.status).toBe('rejected');
  });

  it('should return correct primitives', () => {
    const transaction = new Transaction('tx4', 800);
    transaction.validateAmount();
    const primitives = transaction.toPrimitives();
    expect(primitives).toEqual({
      id: 'tx4',
      amount: 800,
      status: 'approved',
    });
  });

  it('should handle status passed in constructor', () => {
    const transaction = new Transaction('tx5', 500, 'pending');
    expect(transaction.status).toBe('pending');
  });
});
