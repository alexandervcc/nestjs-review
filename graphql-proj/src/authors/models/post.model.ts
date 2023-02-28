import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: false })
  title?: string;

  @Field({ nullable: false })
  content?: string;

  @Field((type) => Int, { nullable: true })
  votes?: number;
}
