import { DynamicModule, Module, Type } from '@nestjs/common';
import { UserController } from './presenters/user.controller';
import { UserService } from './application/user.service';
import { CreateUserCommandHandler } from './application/commands/create-user/create-user.command-handler';
import { UsersCommandReopository } from './infrastructure/persistence/repositories/users-command.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './infrastructure/persistence/schema/user.schema';
import { HttpModule } from '@nestjs/axios';
import { GetSingleUserQureyHandler } from './application/queries/get-single-user/get-single-user.query-handler';
import { UsersQueryReopository } from './infrastructure/persistence/repositories/users-query.repository';
import { RabbitMQClient } from '../../shared/infrastructure/rabbit-mq/rabbit-mq.client';
import { UserCreatedEventHandler } from './application/event-handlers/user-created.event-handler';
import { UpsertMaterializedUserRepository } from './application/ports/upsert-materialized-user.repository';
import { OrmUpsertMaterializedAlarmRepository } from './infrastructure/persistence/repositories/upsert-materialized-user.repository';
import { MaterializedUserView, MaterializedUserViewSchema } from './infrastructure/persistence/schema/materialized-alarm-view.schema';
import { AbstractUserCommandRepository } from './application/ports/abstract-user-command.repository';
import { AbstractUserQueryRepository } from './application/ports/abstract-user-query.repository copy';
import { EVENT_STORE_CONNECTION } from '../../core/core.constants';
import { DeleteUserCommandHandler } from './application/commands/delete-user/delete-user.command-handler';
import { GetAvatarUserQureyHandler } from './application/queries/get-avatar/get-avatar-user.query-handler';

@Module({
  providers:[
    UserService,
    RabbitMQClient,
    UsersCommandReopository,
    UsersQueryReopository,
    CreateUserCommandHandler,
    DeleteUserCommandHandler,
    GetSingleUserQureyHandler,
    GetAvatarUserQureyHandler,
    {
      provide: UpsertMaterializedUserRepository,
      useClass: OrmUpsertMaterializedAlarmRepository,
    },
    {
      provide: AbstractUserCommandRepository,
      useClass: UsersCommandReopository,
    },
    {
      provide: AbstractUserQueryRepository,
      useClass: UsersQueryReopository,
    },
    UserCreatedEventHandler,],
  controllers: [UserController],
  imports:[
    HttpModule,
    MongooseModule.forFeature([{name: "User", schema: UserSchema}]),
    MongooseModule.forFeature([{ name: MaterializedUserView.name, schema: MaterializedUserViewSchema }]),
    MongooseModule.forRoot('mongodb://localhost:27017/vf-read-db'),
    MongooseModule.forRoot('mongodb://localhost:27017/vf-event-store', {
      connectionName: EVENT_STORE_CONNECTION,
      directConnection: true,
    }),
  ]
})
export class UsersModule {
  static withInfastructure(
    infrastructureModule: Type | DynamicModule,
  ): DynamicModule {
    return {
      module: UsersModule,
      imports: [infrastructureModule],
    };
  }
}
