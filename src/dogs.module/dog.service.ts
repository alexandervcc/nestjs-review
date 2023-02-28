import { Injectable } from '@nestjs/common/decorators';
import { Dog } from 'src/model/Dog';
import { Scope } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

//Configure scope of object: like a Global Singleton, or a new instance per consumer/request.
@Injectable({ scope: Scope.DEFAULT })
export class DogService {
  private counter = 0;
  private listDogs: Dog[] = [];

  //Lazy module loading
  //constructor(private lazyModuleLoader: LazyModuleLoader) {}

  constructor() {}

  getAll(): Dog[] {
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
