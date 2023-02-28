import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DogModule } from './dog.module';
import { DogService } from './dog.service';

describe('Dogs e2e', () => {
  let app: INestApplication;
  let dogService = { getAll: () => [] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DogModule],
    })
      .overrideProvider(DogService)
      .useValue(dogService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET dogs`, () => {
    return request(app.getHttpServer()).get('/dogs').expect(200).expect({
      data: dogService.getAll(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
