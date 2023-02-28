import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: false,
      include: [], //to add resolvers of the app
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), //location where to generate the Graphql schema
      sortSchema: true, //to sort the generated schemas lexicographically as by default it is done thourgh the modules order
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
