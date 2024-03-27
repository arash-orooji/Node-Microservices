import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersQueryReopository } from '../../../../../apps/users/infrastructure/persistence/repositories/users-query.repository';
import { GetAvatarUserQurey } from './get-avatar.query';

@QueryHandler(GetAvatarUserQurey)
export class GetAvatarUserQureyHandler implements IQueryHandler<GetAvatarUserQurey>{
    constructor(private repository:UsersQueryReopository) {}
    
    async execute(query: GetAvatarUserQurey): Promise<any> {
       return await this.repository.getUserAvatar(query.userId)
    }

}