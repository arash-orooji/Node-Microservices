import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { RabbitMQModule } from './rabbit-mq/rabbit-mq.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/usersAppDb'),
    UsersModule,

  ],
})
export class AppModule {}

