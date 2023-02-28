import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ForbiddenException } from './exceptions/forbidden.exception';
import { HttpExceptionFilter } from './filters/http-exception.filter';

//Using custom exception filter in this controller
//This is a controller scoped filter
@UseFilters(HttpExceptionFilter)  
@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('/exception')
  exceptionEndpoint(@Query('ex') exMessage: string) {
    throw new HttpException(
      `Exception: ${exMessage}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Get('/exception-forbidden')
  exceptionForbiddenEndpoint(@Query('ex') exMessage: string) {
    throw new ForbiddenException(exMessage);
  }
}
