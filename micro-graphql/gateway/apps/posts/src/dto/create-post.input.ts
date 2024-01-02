import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  id:string;

  @Field(() => String)
  body:string;

  @Field(() => String)
  authorId:string;
}
