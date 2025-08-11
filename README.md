# Installation

1. Install dependencies:
    ```sh
    npm install
    ```

2. Configure environment variables:
    - Create a `.env` file in the microservice folder (`apps/antifraud` or `apps/transaction`). Use `.env.dev` as reference.

# Execution

## Local
To start a microservice in development mode:
```sh
npm run start:antifraud:dev   # Antifraud
npm run start:transaction:dev # Transaction
```

## Docker
Start all services (MongoDB, Kafka, Zookeeper, and microservices):
```sh
docker-compose up --build
```
To stop:
```sh
docker-compose down
```

# Access

Open your browser at:
```
http://localhost:3000
```

# Exposed Endpoints

Microservice `external-transactions`:

### POST /external-transactions
Creates a new external transaction.
- **Body:** `CreateExternalTransactionDto`
- **Response:** `ExternalTransactionResponseDto`
- **Errors:**
   - `400 Bad Request` if the transaction type does not exist

### GET /external-transactions/:id
Gets an external transaction by its ID.
- **Parameter:** `id` (string)
- **Response:** `ExternalTransactionResponseDto`
- **Errors:**
   - `404 Not Found` if the transaction does not exist

# Supported Transaction Types

Only the following values are accepted in the `tranferTypeId` field:

| ID | Type        |
|----|-------------|
| 1  | Transfer    |
| 2  | Withdrawal  |
| 3  | Deposit     |

Other values will generate a `400 Bad Request` error.

# Useful Commands

- **Debug mode:**
   ```sh
   npm run start:debug
   ```
- **Lint:**
   ```sh
   npm run lint
   ```
- **Build:**
   ```sh
   npm run build
   ```
- **Tests:**
   ```sh
   npm run test
   ```
