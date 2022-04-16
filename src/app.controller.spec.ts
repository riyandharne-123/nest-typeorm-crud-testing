/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;
  const mockAppService = {
    create: jest.fn( name => {
      return {
        id: Date.now(),
        name: name
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    })
    .overrideProvider(AppService)
    .useValue(mockAppService)
    .compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    return controller.createUser('test-name').then(data => {
      expect(data).toEqual({
        id: expect.any(Number),
        name: 'test-name'
      })
    })
  });
});
