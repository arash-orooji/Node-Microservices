import { en } from "@faker-js/faker";
import { User } from "../schema/user.schema";
import { CreateUserCommand } from "../../../../../apps/users/application/commands/create-user/create-user.command";

export class UserMapper{

    static toPersistence(command: CreateUserCommand): User {
        const entity = new User();
        entity.firstName = command.firstName;
        entity.lastName = command.lastName;
        entity.avatar = command.avatar;
        entity.gender = command.gender;
    
        return entity;
      }

}