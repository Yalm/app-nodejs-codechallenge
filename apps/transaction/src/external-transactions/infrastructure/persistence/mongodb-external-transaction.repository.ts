import { Injectable } from '@nestjs/common';
import { ExternalTransactionRepository } from '../../domain/external-transaction.repository';
import { ExternalTransaction } from '../../domain/external-transaction.entity';
import { Collection, MongoClient } from 'mongodb';
import { ConfigService } from '@nestjs/config';

type ExternalTransactionDocument = Omit<
  ReturnType<ExternalTransaction['toPrimitives']>,
  'id'
> & { _id: string };

@Injectable()
export class MongodbExternalTransactionRepository
  implements ExternalTransactionRepository
{
  private readonly collection: Collection<ExternalTransactionDocument>;
  constructor(
    private readonly mongoClient: MongoClient,
    configService: ConfigService,
  ) {
    this.collection = this.mongoClient
      .db(configService.get('db.mongo.dbName'))
      .collection('externaltransactions');
  }

  async create(
    externalTransaction: ExternalTransaction,
  ): Promise<ExternalTransaction> {
    const doc = externalTransaction.toPrimitives();
    await this.collection.insertOne({
      _id: doc.id,
      transactionType: doc.transactionType,
      accountExternalIdDebit: doc.accountExternalIdDebit,
      accountExternalIdCredit: doc.accountExternalIdCredit,
      value: doc.value,
      status: doc.status,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });

    return externalTransaction;
  }

  async findById(id: string): Promise<ExternalTransaction> {
    const externalTransaction = await this.collection.findOne({
      _id: id,
    });

    return new ExternalTransaction(
      externalTransaction._id,
      externalTransaction.transactionType,
      externalTransaction.accountExternalIdDebit,
      externalTransaction.accountExternalIdCredit,
      externalTransaction.value,
      externalTransaction.status,
      externalTransaction.createdAt,
      externalTransaction.updatedAt,
    );
  }

  async updateStatusById(
    id: string,
    doc: Pick<ExternalTransaction, 'status'>,
  ): Promise<void> {
    await this.collection.updateOne(
      { _id: id },
      { $set: { status: doc.status, updatedAt: new Date() } },
    );
  }
}
