import {NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './guards/auth.guard';
import { funtionLoggerMiddleware } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Global Middleware
  app.use(funtionLoggerMiddleware);

  //Global Exception Filter
  //app.useGlobalFilters(new HttpExceptionFilter());

  //Configure Based Extended Global Filter
  //const { httpAdapter } = app.get(HttpAdapterHost);
  //app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  //Configure Global Guard
  app.useGlobalGuards(new AuthGuard())

  await app.listen(3000);
}

bootstrap();
