import { Field, ArgsType, ObjectType, ID } from "type-graphql";
import { User as UserI } from "../model/User";
import { ObjectId } from "mongodb";

@ArgsType()
@ObjectType()
export class UserDto implements Omit<UserI, "_id"> {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  password!: string;

  @Field(() => String)
  email!: string;
}

@ArgsType()
@ObjectType()
export class User implements Omit<UserI, "password"> {
  @Field(() => ID)
  _id!: ObjectId;

  @Field(() => String)
  username!: string;

  @Field(() => String)
  email!: string;
}
