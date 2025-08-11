import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  CreateExternalTransactionDto,
  ExternalTransactionResponseDto,
} from '../application/dtos';
import { ExternalTransactionNotFoundException } from '../domain/exceptions/external-transaction-not-found.exception';
import {
  CREATE_EXTERNAL_TRANSACTIONS_USE_CASE,
  type CreateExternalTransactionsUseCase,
} from '../application/use-cases/create-external-transaction.use-case';
import {
  FIND_BY_ID_EXTERNAL_TRANSACTIONS_USE_CASE,
  type FindByIdExternalTransactionsUseCase,
} from '../application/use-cases/find-by-id-external-transaction.use-case';
import { ExternalTransactionTypeNotFoundException } from '../domain/exceptions/external-transaction-type-not-found.exception';

@Controller('external-transactions')
export class ExternalTransactionsController {
  private readonly logger = new Logger(ExternalTransactionsController.name);
  constructor(
    @Inject(CREATE_EXTERNAL_TRANSACTIONS_USE_CASE)
    private readonly createExternalTransactionsUseCase: CreateExternalTransactionsUseCase,
    @Inject(FIND_BY_ID_EXTERNAL_TRANSACTIONS_USE_CASE)
    private readonly findByIdExternalTransactionsUseCase: FindByIdExternalTransactionsUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateExternalTransactionDto) {
    this.logger.debug('Creating external transaction', dto);
    try {
      const externalTransaction =
        await this.createExternalTransactionsUseCase.execute(dto);
      return new ExternalTransactionResponseDto(externalTransaction);
    } catch (error) {
      if (error instanceof ExternalTransactionTypeNotFoundException) {
        throw new BadRequestException({
          message: ['Transaction type not found'],
        });
      }
      throw error;
    }
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(5000)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    this.logger.debug(`Finding external transaction with id ${id}`);
    try {
      const externalTransaction =
        await this.findByIdExternalTransactionsUseCase.execute(id);
      return new ExternalTransactionResponseDto(externalTransaction);
    } catch (error) {
      if (error instanceof ExternalTransactionNotFoundException) {
        throw new NotFoundException();
      }
      throw error;
    }
  }
}
