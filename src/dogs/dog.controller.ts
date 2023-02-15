import {
  Controller,
  Get,
  HttpCode,
  Req,
  Post,
  Body,
  Header,
  Redirect,
  Param,
  ParseIntPipe,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { createDogSchema, Dog } from 'src/model/Dog';
import { DogValidationPipe } from 'src/pipes/dog-validation.pipe';
import { DogService } from './dog.service';

@Controller('dogs')
export class DogController {
  constructor(private readonly appService: DogService) {}

  @Get()
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  getHello(@Req() request: Request): Dog[] {
    return this.appService.getAllDogs();
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new DogValidationPipe(createDogSchema))
  async createDog(@Body() dogDto: Dog): Promise<Dog> {
    return await this.appService.createNewDog(dogDto);
  }

  @Get('/redirect')
  @Redirect('https://nestjs.com', 301)
  redirectTest() {}

  //findOne(@Param('id', ParseIntPipe) idDog: number): Dog {
  @Get('/:id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    idDog: number,
  ): Dog {
    return this.appService.getById(idDog);
  }
}
