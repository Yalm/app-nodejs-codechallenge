import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';

@Module({
  providers: [
    {
      provide: MongoClient,
      useFactory(configService: ConfigService) {
        const config = configService.get<{
          uri: string;
          dbName: string;
          auth?: { username: string; password: string };
        }>('db.mongo');

        return MongoClient.connect(config.uri, {
          auth: config.auth,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [MongoClient],
})
export class MongoDBModule {}
