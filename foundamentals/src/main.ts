import { AppModule } from './app.module';
import {HttpAdapterHost, LazyModuleLoader, NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/all-exceptioin.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AuthGuard } from './guards/auth.guard';
import { funtionLoggerMiddleware } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Global Middleware
  //app.use(funtionLoggerMiddleware);

  //Global Exception Filter
  //app.useGlobalFilters(new HttpExceptionFilter());

  //Configure Based Extended Global Filter
  //const { httpAdapter } = app.get(HttpAdapterHost);
  //app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  //Configure Global Guard
  //app.useGlobalGuards(new AuthGuard())

  // "app" represents a Nest application instance
  //const lazyModuleLoader = app.get(LazyModuleLoader);

  // Starts listening for shutdown hooks, disabled by default as consumes resources
  //app.enableShutdownHooks();

  await app.listen(3000);
}

bootstrap();
