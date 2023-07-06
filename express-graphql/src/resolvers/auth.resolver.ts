import { Resolver, Mutation, Args } from "type-graphql";
import { UserDto } from "../dto/UserDto";
import { User } from "../model/User";
import { AuthServiceI } from "../services/interfaces/auth-service";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthServiceI) {}

  @Mutation(() => UserDto)
  async signUp(@Args({ validate: false }) userDto: UserDto) {
    return this.authService.signUp(userDto);
  }
}
