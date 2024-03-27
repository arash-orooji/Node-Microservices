import { VersionedAggregateRoot } from "src/shared/domain/aggregate-root";

export class UserAggregate extends VersionedAggregateRoot{
    firstName: string
    lastName: string
    gender: string
    avatar: Buffer
}