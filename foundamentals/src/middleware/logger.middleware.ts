import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Class Request Logging: ', req.method, req.url);
    next();
  }
}

export const funtionLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('Function Request Logging: ', req.method, req.url);
  next();
};
