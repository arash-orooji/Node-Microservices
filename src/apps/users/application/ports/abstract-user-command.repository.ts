import { User } from "../../infrastructure/persistence/schema/user.schema";

export abstract class AbstractUserCommandRepository {
   abstract createUser(user: User): Promise<User>
   abstract deleteUser(usertId: string): Promise<User>
}