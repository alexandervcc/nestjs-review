import { ObjectType, Field } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class Post {
  @Field(() => String)
  id: string;

  @Field(() => String)
  body: string;

  @Field(() => String)
  authorId: string;

  @Field(() => User)
  user?: User;
}
