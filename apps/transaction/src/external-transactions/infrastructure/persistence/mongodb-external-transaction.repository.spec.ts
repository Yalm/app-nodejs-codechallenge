import { Test, TestingModule } from '@nestjs/testing';
import { MongodbExternalTransactionRepository } from './mongodb-external-transaction.repository';
import {
  ExternalTransaction,
  ExternalTransactionStatus,
} from '../../domain/external-transaction.entity';
import { MongoClient } from 'mongodb';
import { ConfigService } from '@nestjs/config';

describe('MongodbExternalTransactionRepository', () => {
  let repository: MongodbExternalTransactionRepository;
  const collection = {
    insertOne: jest.fn(),
    findOne: jest.fn(),
    updateOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MongodbExternalTransactionRepository,
        {
          provide: ConfigService,
          useValue: { get: jest.fn() },
        },
        {
          provide: MongoClient,
          useValue: {
            db: jest.fn().mockReturnValue({ collection: () => collection }),
          },
        },
      ],
    }).compile();

    repository = module.get<MongodbExternalTransactionRepository>(
      MongodbExternalTransactionRepository,
    );
  });

  describe('create', () => {
    it('should insert a new external transaction and return it', async () => {
      const externalTransaction = new ExternalTransaction(
        'tx123',
        { id: 1, name: 'type' },
        'debitId',
        'creditId',
        100,
        ExternalTransactionStatus.PENDING,
        new Date('2024-01-01'),
        new Date('2024-01-01'),
      );

      collection.insertOne.mockResolvedValue({});

      const result = await repository.create(externalTransaction);

      expect(collection.insertOne).toHaveBeenCalledWith({
        _id: 'tx123',
        transactionType: { id: 1, name: 'type' },
        accountExternalIdDebit: 'debitId',
        accountExternalIdCredit: 'creditId',
        value: 100,
        status: 'pending',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      });
      expect(result).toBe(externalTransaction);
    });
  });

  describe('findById', () => {
    it('should find an external transaction by id and return an entity', async () => {
      const doc = {
        _id: 'tx123',
        transactionType: 'type',
        accountExternalIdDebit: 'debitId',
        accountExternalIdCredit: 'creditId',
        value: 100,
        status: 'pending',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      };
      collection.findOne.mockResolvedValue(doc);

      const result = await repository.findById('tx123');

      expect(collection.findOne).toHaveBeenCalledWith({ _id: 'tx123' });
      expect(result).toBeInstanceOf(ExternalTransaction);
      expect(result).toMatchObject({
        id: 'tx123',
        transactionType: 'type',
        accountExternalIdDebit: 'debitId',
        accountExternalIdCredit: 'creditId',
        value: 100,
        status: 'pending',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      });
    });
  });

  describe('updateStatusById', () => {
    it('should update the status and updatedAt of an external transaction', async () => {
      collection.updateOne.mockResolvedValue({});

      const statusDoc = { status: ExternalTransactionStatus.APPROVED };
      const id = 'tx123';

      await repository.updateStatusById(id, statusDoc);

      expect(collection.updateOne).toHaveBeenCalledWith(
        { _id: id },
        expect.objectContaining({
          $set: expect.objectContaining({
            status: 'approved',
            updatedAt: expect.any(Date),
          }),
        }),
      );
    });
  });
});
