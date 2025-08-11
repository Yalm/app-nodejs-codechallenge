export default () => ({
  http: {
    port: parseInt(process.env.PORT, 10) || 3000,
    host: process.env.HOST || '0.0.0.0',
  },
  db: {
    mongo: {
      uri: process.env.MONGO_URI,
      dbName: process.env.MONGO_DB || 'transaction',
      auth: {
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
      },
    },
  },
  kafka: {
    clientId: process.env.KAFKA_CLIENT_ID || 'transaction',
    groupId: process.env.KAFKA_GROUP_ID || 'transaction-consumer',
    brokers: process.env.KAFKA_BROKERS?.split(','),
  },
});
