import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';

@ObjectType()
//Tells Apollo Federation to identify a user entity by the `id` field
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

}
