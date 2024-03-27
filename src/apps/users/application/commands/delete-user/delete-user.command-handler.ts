import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteUserCommand } from "./delete-user.command";
import { AbstractUserCommandRepository } from "../../ports/abstract-user-command.repository";
import { Logger } from "@nestjs/common";

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand>{
    private readonly logger = new Logger(DeleteUserCommandHandler.name);
    constructor(private repository:AbstractUserCommandRepository) {}

    async execute(command: DeleteUserCommand): Promise<any> {
        let result = await this.repository.deleteUser(command.userId)
        return result
    }

}