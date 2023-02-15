import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { funtionLoggerMiddleware } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Global Middleware
  app.use(funtionLoggerMiddleware);

  await app.listen(3000);
}
bootstrap();
