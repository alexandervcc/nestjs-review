import { Injectable } from '@nestjs/common';
import { Dog } from './model/Dog';

@Injectable()
export class AppService {
  private counter = 0;
  private listDogs: Dog[] = [];

  getAllDogs(): Dog[] {
    return this.listDogs.slice();
  }

  createNewDog(newDog: Dog): Dog {
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
