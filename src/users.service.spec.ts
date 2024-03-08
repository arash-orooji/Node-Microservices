import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from './users/users.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest'; 
import { AppModule } from './app.module';

describe('SuperheroController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Get User from reqres.in', () => {
    var response ={
      message: 'Get User successfully',
      result: {
        id: 10,
        email: 'byron.fields@reqres.in',
        first_name: 'Byron',
        last_name: 'Fields',
        avatar: 'https://reqres.in/img/faces/10-image.jpg'
      }
    }
    return request(app.getHttpServer())
      .get('/api/user/10')
      .expect(302)
      .expect(({ body }) => {
        console.log(body)
          expect(body.message).toEqual(response.message);
          expect(body.result).toBeDefined();
          expect(body.result.avatar).toBe(response.result.avatar);
          expect(body.result.email).toBe(response.result.email);
          expect(body.result.first_name).toBe(response.result.first_name);
          expect(body.result.id).toBe(response.result.id);
          expect(body.result.last_name).toBe(response.result.last_name);
      });
  });

  it('Get User from reqres.in', () => {
    var response ={
      message: 'Get User successfully',
      result: {
        id: 10,
        email: 'byron.fields@reqres.in',
        first_name: 'Byron',
        last_name: 'Fields',
        avatar: 'https://reqres.in/img/faces/10-image.jpg'
      }
    }
    return request(app.getHttpServer())
      .get('/api/user/10')
      .expect(302)
      .expect(({ body }) => {
        console.log(body)
          expect(body.message).toEqual(response.message);
          expect(body.result).toBeDefined();
          expect(body.result.avatar).toBe(response.result.avatar);
          expect(body.result.email).toBe(response.result.email);
          expect(body.result.first_name).toBe(response.result.first_name);
          expect(body.result.id).toBe(response.result.id);
          expect(body.result.last_name).toBe(response.result.last_name);
      });
  });

  it('Get User from reqres.in', () => {
    var response ={
      message: 'Get User successfully',
      result: {
        id: 10,
        email: 'byron.fields@reqres.in',
        first_name: 'Byron',
        last_name: 'Fields',
        avatar: 'https://reqres.in/img/faces/10-image.jpg'
      }
    }
    return request(app.getHttpServer())
      .get('/api/user/10')
      .expect(302)
      .expect(({ body }) => {
        console.log(body)
          expect(body.message).toEqual(response.message);
          expect(body.result).toBeDefined();
          expect(body.result.avatar).toBe(response.result.avatar);
          expect(body.result.email).toBe(response.result.email);
          expect(body.result.first_name).toBe(response.result.first_name);
          expect(body.result.id).toBe(response.result.id);
          expect(body.result.last_name).toBe(response.result.last_name);
      });
  });
});