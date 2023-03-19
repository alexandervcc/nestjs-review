import { Resolver, Mutation, Args } from "type-graphql";
import { UserDto } from "../dto/UserDto";

@Resolver()
export class AuthResolver {
  @Mutation(() => String)
  async signUp(@Args({ validate: false }) newUser: UserDto): Promise<String> {
    return "xd"
  }
}
