/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { AppService } from '../src/app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../src/entities/user.entity';
import { Subject } from '../src/entities/subject.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let appService: AppService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forFeature([User, Subject])
      ],
      providers: [AppService]
    })
    .compile();

    appService = moduleFixture.get<AppService>(AppService);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', async () => {
    const users = await appService.getAll()
    return await request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(JSON.stringify(users))
  });

  it('/users/:id (GET)', async () => {
    const user = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'test user'
      })
      .expect(201)

    const user_id = user.body.id
    
    const data = await request(app.getHttpServer())
      .get(`/users/${user_id}`)
      .expect(200)
      .expect(user.body)

    await request(app.getHttpServer())
      .delete(`/users/${user_id}`)
      .expect(200)

    return data
  });


  it('/users (POST)', async () => {
    const data = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'test user'
      })
      .expect(201)

    const user_id = data.body.id

    expect(data.body).toEqual({
      name: data.body.name,
      id: user_id
    })

    await request(app.getHttpServer())
      .delete(`/users/${user_id}`)
      .expect(200)

    return data
  });

  it('/users/:id (PUT)', async () => {
    const user = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'test user'
      })
      .expect(201)

    const user_id = user.body.id

    expect(user.body).toEqual({
      name: user.body.name,
      id: user_id
    })

    const updatedUser = await request(app.getHttpServer())
      .put(`/users/${user_id}`)
      .send({
        name: 'test user (updated)!'
      })
      .expect(200)

    expect(updatedUser.body).toEqual({
      name: updatedUser.body.name,
      id: user_id
    })

    await request(app.getHttpServer())
      .delete(`/users/${user_id}`)
      .expect(200)

    return updatedUser
  });

  it('/users/:id (DELETE)', async () => {
    const data = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'test user'
      })
      .expect(201)

    const user_id = data.body.id

    expect(data.body).toEqual({
      name: data.body.name,
      id: user_id
    })

    await request(app.getHttpServer())
      .delete(`/users/${user_id}`)
      .expect(200)

    await request(app.getHttpServer())
      .get(`/users/${user_id}`)
      .expect(500)

    return data
  });

});
