import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './apps/users/users.module';
import { UserController } from './apps/users/presenters/user.controller';
import { UserService } from './apps/users/application/user.service';
import { RabbitMQClient } from './shared/infrastructure/rabbit-mq/rabbit-mq.client';

@Module({
  imports: [CqrsModule.forRoot(), SharedModule, UsersModule],
  controllers: [UserController],
  providers: [
    RabbitMQClient,
    UserService],
})
export class AppModule {
  static register(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        SharedModule,
        UsersModule 
      ],
    };
  }
}
