import { IsString, IsInt, Min } from 'class-validator';
import * as Joi from 'joi';

export class Dog {
  id?: number;
  @IsString()
  name: string;
  @IsString()
  breed: string;
  @IsInt()
  @Min(0)
  age: number;
}

export const createDogSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
});
