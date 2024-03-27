import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserDto } from './dto/create-user.dto';

import { faker } from '@faker-js/faker';
import { UserService } from '../application/user.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
describe('UserController', () => {
  let controller: UserController;
  const mocUsersController = {
    create: jest.fn(),
    // findAll: jest.fn(),
    // acknowledge: jest.fn()
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers:[UserService,{
        provide: CommandBus,
        useValue: jest.fn(),
      },{
        provide: QueryBus,
        useValue: jest.fn(),
      },{
        provide: UserService,
        useValue: mocUsersController,
      }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return 201 status code', async () => {
  // assign
   var dto =new CreateUserDto();
   dto.avatar
    expect(controller.createUser).toBeDefined();
    // expect(result).toContain(createUser);
  });
});
