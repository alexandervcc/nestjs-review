import { Field, ArgsType } from "type-graphql";

@ArgsType()
export class UserDto {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  password!: string;

  @Field(() => String)
  email!: string;
}
