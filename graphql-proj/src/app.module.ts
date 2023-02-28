import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { AuthorsModule } from './authors/author.module';
import { PostModule } from './posts/post.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), //location where to generate the Graphql schema
      //plugins:[ApolloServerPluginLandingPageLocalDefault]
      //playground: false,
      //debug: false,
      //include: [], //to add resolvers of the app 
      //sortSchema: true, //to sort the generated schemas lexicographically as by default it is done thourgh the modules order
    }),
    AuthorsModule,
    PostModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
