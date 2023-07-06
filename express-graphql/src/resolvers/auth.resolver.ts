import { Resolver, Mutation, Args, Query, Arg } from "type-graphql";
import { UserDto } from "../dto/UserDto";
import { Result, ResultDto } from "../dto/ResultDto";
import Container from "typedi";
import AuthService from "../services/auth.service";
import MongoConnection from "../config/mongodb";

@Resolver()
class AuthResolver {
  private authService: AuthService;
  constructor() {
    this.authService = Container.get(AuthService);
  }

  @Mutation(() => ResultDto)
  async signUp(@Args({ validate: false }) userDto: UserDto): Promise<Result> {
    return await this.authService.signUp(userDto);
  }

  @Query(() => UserDto)
  async getUserData(@Arg("id") id: string) {
    return new UserDto();
  }
}

export default AuthResolver;