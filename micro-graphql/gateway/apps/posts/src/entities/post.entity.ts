import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => String)
  id:string;

  @Field(() => String)
  body:string;

  @Field(() => String)
  authorId:string; 
}
