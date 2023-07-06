import { Field, ArgsType, ObjectType } from "type-graphql";
import { User } from "../model/User";
import { ObjectId } from "mongodb";

@ArgsType()
@ObjectType()
export class UserDto implements Omit<User, "_id"> {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  password!: string;

  @Field(() => String)
  email!: string;
}
