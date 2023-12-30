import { NestFactory } from '@nestjs/core';
import { PostsServiceModule } from './posts-service.module';

async function bootstrap() {
  const app = await NestFactory.create(PostsServiceModule);
  await app.listen(3000);
}
bootstrap();
