import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EVENT_STORE_CONNECTION } from './core.constants';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/vf-read-db'),
    MongooseModule.forRoot('mongodb://localhost:27017/vf-event-store', {
      connectionName: EVENT_STORE_CONNECTION,
      directConnection: true,
    }),
  ],exports:[
    MongooseModule.forRoot('mongodb://localhost:27017/vf-read-db'),
    MongooseModule.forRoot('mongodb://localhost:27017/vf-event-store', {
      connectionName: EVENT_STORE_CONNECTION,
      directConnection: true,
    }),
  ]
})
export class CoreModule {
}
