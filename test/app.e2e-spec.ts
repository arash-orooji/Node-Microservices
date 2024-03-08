import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('api/user/10')
      .expect(200);
  });
  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('api/users')
      .expect(200);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .delete('api/user/65e60953de9523ee47375dd0/avatar')
      .expect(200);
  });
 
});
