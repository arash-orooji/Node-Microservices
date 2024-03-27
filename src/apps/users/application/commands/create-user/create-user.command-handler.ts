import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UsersCommandReopository } from '../../../infrastructure/persistence/repositories/users-command.repository';
import { UserMapper } from '../../../infrastructure/persistence/mapper/user.mapper';
import { User } from '../../../infrastructure/persistence/schema/user.schema';
import { CreateUserCommand } from './create-user.command';
import { Logger } from '@nestjs/common';
import { AbstractUserCommandRepository } from '../../ports/abstract-user-command.repository';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand,User>{
    private readonly logger = new Logger(CreateUserCommandHandler.name);
    constructor(private repository:AbstractUserCommandRepository) {
    }
    async execute(command: CreateUserCommand): Promise<User> {
        this.logger.debug(
            `Processing "CreateUserCommand": ${JSON.stringify(command)}`,
          );
        var mapper = UserMapper.toPersistence(command);
        var user = await this.repository.createUser(mapper);
        return user;
    }

}