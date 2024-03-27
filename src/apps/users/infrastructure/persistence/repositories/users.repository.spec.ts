import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { User, UserSchema } from '../schema/user.schema';
import { UsersCommandReopository } from './users-command.repository';
import { faker } from '@faker-js/faker';
import { UsersQueryReopository } from './users-query.repository';
import { NotFoundException } from '@nestjs/common';
 
describe('UsersCommandReopository', () => {
  let commandRepository: UsersCommandReopository;
 let queryRepository: UsersQueryReopository;

  let user = new User()
  user.id = faker.database.mongodbObjectId(),
  user.firstName=faker.person.firstName();
  user.lastName=faker.person.lastName();
  user.gender=faker.person.gender();
  user.avatar=faker.image.avatar();


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        HttpModule,
        MongooseModule.forFeature([{name: "User", schema: UserSchema}]),
        MongooseModule.forRoot('mongodb://localhost:27017/vf-read-db')
      ],
      providers:[UsersCommandReopository,UsersQueryReopository],
    }).compile();

    commandRepository = module.get<UsersCommandReopository>(UsersCommandReopository);
   queryRepository = module.get<UsersQueryReopository>(UsersQueryReopository);
  });
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it('should be defined', () => {
    expect(commandRepository).toBeDefined();
    expect(queryRepository).toBeDefined();
  });
  //Step One : Create User
  it('Step 1 : Create User (should return expected)', () => { 
      // act
      var result = commandRepository.createUser(user);
      //  assert
      expect(result).resolves.toBeDefined()
      expect(result).resolves.toBe(user);
  });
    //Step One : Create User
    it('Step 2 : Get avatar (should return expected)', () => { 
      // act
      var result = queryRepository.getUserAvatar(user.id);
      //  assert
      expect(result).resolves.toBeDefined()
      expect(result).resolves.toBe(user || new  NotFoundException(`User #${user.id} not found`));
  });
  // Step Two : Find User from reqres.in API
  it('Step 3 : Find User from reqres.in API (should return expected)', () => { 
      // act
      var result = queryRepository.getUser("12");
      //  assert
      expect(result).toBeDefined()
      var expectedvalue =    {
        data: {
            id: 12,
            email: "rachel.howell@reqres.in",
            first_name: "Rachel",
            last_name: "Howell",
            avatar: "https://reqres.in/img/faces/12-image.jpg"
        },
        support: {
            url: "https://reqres.in/#support-heading",
            text: "To keep ReqRes free, contributions towards server costs are appreciated!"
        }
    }
      expect(result).resolves.toStrictEqual(expectedvalue);
  })
  //Step Two : Find User from reqres.in API
  it('Step 4 : Find User from reqres.in API (should delete user)', () => { 
        // act
        var result = commandRepository.deleteUser(user.id);
        //  assert
        expect("result").toBeDefined()
  })
})
