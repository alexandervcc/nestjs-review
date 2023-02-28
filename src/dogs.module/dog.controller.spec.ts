import { Test } from '@nestjs/testing';
import { DogController } from './dog.controller';
import { DogService } from './dog.service';

describe('Dogs Controller', () => {
  let dogController: DogController;
  let dogService: DogService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DogController],
      providers: [DogService],
    }).compile();

    dogService = moduleRef.get<DogService>(DogService);
    dogController = moduleRef.get<DogController>(DogController);
  });

  describe('findAll Dogs', () => {
    it('Dhould return an array of dogs', async () => {
      const result = [];
      jest.spyOn(dogService, 'getAllDogs').mockImplementation(() => result);

      expect(dogController.getAllDogs()).toBe(result);
    });
  });
});
