import { Module } from '@nestjs/common';
import { UsersController } from './controllers/user.controller';
import { UsersService } from './services/users.service';
import { HttpModule } from '@nestjs/axios'; 
import { MongooseModule } from '@nestjs/mongoose';
import { User,UserSchema } from './schema/user.schema';
import { RabbitMQModule } from '../rabbit-mq/rabbit-mq.module';

@Module({
  imports: [
    HttpModule, 
    RabbitMQModule,
    MongooseModule.forFeature([{name: "User", schema: UserSchema}])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
