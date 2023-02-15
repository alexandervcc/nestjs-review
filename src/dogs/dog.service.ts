import { Injectable } from '@nestjs/common/decorators';
import { Dog } from 'src/model/Dog';

@Injectable()
export class DogService {
  private counter = 0;
  private listDogs: Dog[] = [];

  getAllDogs(): Dog[] {
    return this.listDogs.slice();
  }

  async createNewDog(newDog: Dog): Promise<Dog> {
    this.counter++;
    newDog.id = this.counter;
    this.listDogs.push(newDog);
    return newDog;
  }

  getById(dogId: number): Dog {
    const dog = this.listDogs.find((d) => d.id === dogId);
    return dog;
  }
}
