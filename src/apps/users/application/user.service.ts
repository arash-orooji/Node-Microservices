import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserCommand } from "./commands/create-user/create-user.command";
import { Injectable } from "@nestjs/common";
import { GetSingleUserQurey } from "./queries/get-single-user/get-single-user.query";
import { RabbitMQClient } from "../../../shared/infrastructure/rabbit-mq/rabbit-mq.client";
import { DeleteUserCommand } from "./commands/delete-user/delete-user.command";
import { User } from "../infrastructure/persistence/schema/user.schema";
import { GetAvatarUserQurey } from "./queries/get-avatar/get-avatar.query";

@Injectable()
export class UserService{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly rabbitMQClient: RabbitMQClient,
      ) {}
      async create(command: CreateUserCommand):Promise<User> {
        var result = await this.commandBus.execute<CreateUserCommand,User>(command);
        var message ={
          firstName: result.firstName,
          lastName: result.lastName,
          gender: result.gender
        }
        // Send event after save user in database
        await this.rabbitMQClient.sendMessage('rpc_queue', JSON.stringify(message));
        return result;
      }
      async getSingleUser(query: GetSingleUserQurey) {
        return await this.queryBus.execute(query);
      }
      async getavatarUser(query: GetAvatarUserQurey) {
        return await this.queryBus.execute(query);
      }
      async DeleteUser(command:DeleteUserCommand):Promise<User>{
        return await this.commandBus.execute<DeleteUserCommand,User>(command)
      }
}