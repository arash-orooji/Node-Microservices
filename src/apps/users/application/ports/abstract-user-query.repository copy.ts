import { User } from "../../infrastructure/persistence/schema/user.schema";

export abstract class AbstractUserQueryRepository {
   abstract getUser(userId: string): Promise<any>
   abstract getUserAvatar(userId: string): Promise<User>
}