import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserReadModel } from 'src/apps/users/domain/read-model/user.read-model';
import { UpsertMaterializedUserRepository } from '../../../../../apps/users/application/ports/upsert-materialized-user.repository';
import { MaterializedUserView } from '../schema/materialized-alarm-view.schema';

export class OrmUpsertMaterializedAlarmRepository
  implements UpsertMaterializedUserRepository
{
  constructor(
    @InjectModel(MaterializedUserView.name)
    private readonly alarmModel: Model<MaterializedUserView>,
  ) {}

  async upsert(
    user: Pick<UserReadModel, 'id'> & Partial<UserReadModel>,
  ): Promise<void> {
    await this.alarmModel.findOneAndUpdate({ id: user.id }, user, {
      upsert: true,
    });
  }
}