import { Resolver, Mutation, Args } from "type-graphql";
import { UserDto } from "../dto/UserDto";
import { AuthServiceI } from "../services/interfaces/auth-service";
import { ResultDto } from "../dto/ResultDto";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthServiceI) {}

  @Mutation(() => ResultDto)
  async signUp(@Args({ validate: false }) userDto: UserDto) {
    return this.authService.signUp(userDto);
  }
}
