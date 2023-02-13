import {
  Controller,
  Get,
  HttpCode,
  Req,
  Post,
  Body,
  Header,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { Dog } from './model/Dog';

@Controller('dogs')
export class AppController {
  constructor(private readonly appService: AppService) {}

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

  @Get("/redirect")
  @Redirect('https://nestjs.com', 301)
  redirectTest() {}
}
