import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/users/sign-up (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/users/sign-up')
      .send({
        firstName: 'firstName',
        lastName: 'lastName',
        username: 'username',
        password: 'password',
      })
      .expect(201);
  });

  it('/api/users/sign-in (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/users/sign-in')
      .send({
        username: 'username',
        password: 'password',
      })
      .expect(201);
  });

  it('/api/auth/decode-jwt (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/auth/decode-jwt')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQWNjb3VudElkIjoxLCJmaXJzdE5hbWUiOiJzdHJpbmciLCJsYXN0TmFtZSI6InN0cmluZyIsInVzZXJuYW1lIjoic3RyaW5nIiwiaWF0IjoxNzA5MjEzMjY3LCJleHAiOjE3MDkyMTQxNjd9.irKiDzIV7nOZS829nIduS_aWaojDuwzP1u5ECaO_CEs',
      )
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('userAccountId');
        expect(response.body).toHaveProperty('firstName');
        expect(response.body).toHaveProperty('lastName');
        expect(response.body).toHaveProperty('username');
      });
  });
});
