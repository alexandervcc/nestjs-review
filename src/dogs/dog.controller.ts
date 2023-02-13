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
} from '@nestjs/common';
import { Request } from 'express';
import { Dog } from 'src/model/Dog';
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
  createDog(@Body() dogDto: Dog): Dog {
    return this.appService.createNewDog(dogDto);
  }

  @Get('/redirect')
  @Redirect('https://nestjs.com', 301)
  redirectTest() {}

  @Get('/:id')
  findOne(@Param('id') idDog: number): Dog {
    return this.appService.getById(+idDog);
  }
}
