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
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { createDogSchema, Dog } from 'src/model/Dog';
import { DogValidationPipeClass } from 'src/pipes/dog-validation-class.pipe';
import { DogValidationPipeJoi } from 'src/pipes/dog-validation-joi.pipe';
import { DogService } from './dog.service';

@Controller('dogs')
@UseGuards(AuthGuard)//Using guard with DI
export class DogController {
  constructor(private readonly appService: DogService) {}

  @Get()
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  getHello(@Req() request: Request): Dog[] {
    return this.appService.getAllDogs();
  }

  @Post('/add')
  @HttpCode(201)
  @Roles("admin")//Custom decorator in order to check metadata
  @UsePipes(new DogValidationPipeJoi(createDogSchema))
  async createDogJoi(@Body() dogDto: Dog): Promise<Dog> {
    return await this.appService.createNewDog(dogDto);
  }

  @Post('/create')
  @HttpCode(201)
  async createDogClassValidation(
    @Body(new DogValidationPipeClass()) dogDto: Dog,
  ): Promise<Dog> {
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
