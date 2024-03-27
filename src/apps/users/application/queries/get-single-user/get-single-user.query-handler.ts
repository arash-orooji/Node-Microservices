import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSingleUserQurey } from './get-single-user.query';
import { UsersQueryReopository } from '../../../../../apps/users/infrastructure/persistence/repositories/users-query.repository';

@QueryHandler(GetSingleUserQurey)
export class GetSingleUserQureyHandler implements IQueryHandler<GetSingleUserQurey>{
    constructor(private repository:UsersQueryReopository) {}
    
    async execute(query: GetSingleUserQurey): Promise<any> {
       return await this.repository.getUser(query.userId)
    }

}