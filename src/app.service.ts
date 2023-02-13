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
    newDog.id = this.counter;
    this.counter++;
    this.listDogs.push(newDog);
    return newDog;
  }
}
