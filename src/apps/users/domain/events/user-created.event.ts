import { AutowiredEvent } from '../../../../shared/decorators/autowired-event.decorator.ts';
import { User } from '../../infrastructure/persistence/schema/user.schema';

@AutowiredEvent
export class UserCreatedEvent {
  constructor(public readonly user: User) {}
}