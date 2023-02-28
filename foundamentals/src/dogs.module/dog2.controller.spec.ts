import { Test } from '@nestjs/testing';
import { DogController } from './dog.controller';
import { DogService } from './dog.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { Dog } from 'src/model/Dog';

const moduleMocker = new ModuleMocker(global);

describe('Dogs Controller', () => {
  let dogController: DogController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DogController],
      providers: [DogService],
    })
      .useMocker((providerToken) => {
        const res: Dog[] = [];
        console.log("token: ",providerToken)
        if (providerToken === DogService) {
          return { getAll: jest.fn().mockReturnValue(res) };
        }
        if (typeof providerToken === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            providerToken,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    dogController = moduleRef.get(DogController);
  });

  describe('findAll Dogs', () => {
    it('Should return an array of dogs', async () => {
      const expected: Dog[] = [];
      const result = dogController.getAllDogs();
      expect(result.length).toBe(expected.length);
    });
  });
});
