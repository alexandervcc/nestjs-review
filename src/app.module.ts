import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogModule } from './dogs/dog.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [DogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  //To use middleware it is required that the module class implements the NestModule interface
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/dogs');
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '', method: RequestMethod.GET });
  }
}
