import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { faker } from '@faker-js/faker';
import { before } from 'node:test';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let userId=''

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('/api/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/users')
      .type('form') // change into `form`
      .send({ 
        lastName: faker.person.lastName(),
        firstName:faker.person.firstName(),
        gender:faker.person.gender(),
        avatar:faker.image.avatar() 
      }).expect(201).then((response)=>{
        userId = response.body.createdUser._id
      })
  })
  it(`/api/user/${userId}/avatar (GET)`, () => {
      return request(app.getHttpServer())
          .get(`/api/user/${userId}/avatar`)
          .expect(202);
  });
  it(`/api/user/${userId}/avatar (DELETE)`, () => {
    return request(app.getHttpServer())
      .delete(`/api/user/${userId}/avatar`)
      .expect(202);
  });
  it('/api/user/12 (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/user/12')
      .expect(302);
  });

  // it('/api/users (POST)', () => {
  //   return request(app.getHttpServer())
  //     .post('/api/users')
  //     .type('form') // change into `form`
  //     .send({ lastName: faker.person.lastName(),firstName:faker.person.firstName(),gender:faker.person.gender(),avatar:faker.image.avatar() })
  //     .expect(201);
  // });
  // it('/api/users (POST)', () => {
  
  //   return request(app.getHttpServer())
    
  //     .post('/api/users')
  //     .type('form') // change into `form`
  //     .send({ lastName: faker.person.lastName(),firstName:faker.person.firstName(),gender:faker.person.gender(),avatar:faker.image.avatar() })
  //     .expect(201);
  // });

  afterAll(async () => {
    await app.close();
  });
});
