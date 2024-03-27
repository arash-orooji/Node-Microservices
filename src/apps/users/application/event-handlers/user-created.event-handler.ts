import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SerializedEventPayload } from '../../../../shared/domain/interfaces/serializable-event';
import { UserCreatedEvent } from '../../domain/events/user-created.event';
import { UpsertMaterializedUserRepository } from '../ports/upsert-materialized-user.repository';

@EventsHandler(UserCreatedEvent) // can handle multiple events
export class UserCreatedEventHandler
  implements IEventHandler<SerializedEventPayload<UserCreatedEvent>>
{
  private readonly logger = new Logger(UserCreatedEventHandler.name);

  constructor(
    private readonly upsertMaterializedAlarmRepository: UpsertMaterializedUserRepository,
  ) {}

  async handle(event: SerializedEventPayload<UserCreatedEvent>) {
    this.logger.debug(`User created event: ${JSON.stringify(event)}`);

    await this.upsertMaterializedAlarmRepository.upsert({
      id: event.user.id,
      avatar: event.user.avatar,
      firstName: event.user.firstName,
      lastName: event.user.firstName,
      gender: event.user.gender,
    });

  }
}