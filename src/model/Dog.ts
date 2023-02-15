import * as Joi from 'joi'

export class Dog {
  id?: number;
  name: string;
  breed: string;
  age: number;
}

export const createDogSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
});
