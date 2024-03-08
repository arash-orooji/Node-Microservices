import { Module } from '@nestjs/common';
import { RabbitMQClient } from './rabbit-mq.client';
import { RabbitMQServer } from './rabbit-mq.server';
import { RabbitMQPublisher } from './rabbit-mq.publisher';
import { RabbitMQSubscriber } from './rabbit-mq.subscriber';

@Module({
  providers: [RabbitMQClient, RabbitMQServer, RabbitMQPublisher, RabbitMQSubscriber],
  exports: [RabbitMQClient, RabbitMQPublisher],
})
export class RabbitMQModule {}