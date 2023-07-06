import { Field, ArgsType } from "type-graphql";
import { User } from "../model/User";
import { ObjectId } from "mongodb";

@ArgsType()
export class UserDto implements Omit<User, "_id"> {
  @Field(() => String)
  _id?: ObjectId;

  @Field(() => String)
  username!: string;

  @Field(() => String)
  password!: string;

  @Field(() => String)
  email!: string;
}
