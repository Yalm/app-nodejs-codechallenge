import { KafkaConnection } from 'nestjs-kafkajs';
import { DomainEvent } from '../domain/domain-event';
import { EventBus } from '../domain/event-bus';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class KafkaEventBus implements EventBus {
  private readonly logger = new Logger(KafkaEventBus.name);
  constructor(private readonly kafkaConnection: KafkaConnection) {}

  async publish(event: DomainEvent): Promise<void> {
    this.logger.debug(`Publishing event: ${event.eventName}`);
    await this.kafkaConnection.publish(event.eventName, event.toPrimitives());
  }
}
