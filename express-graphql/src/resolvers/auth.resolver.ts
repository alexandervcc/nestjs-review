import { Resolver, Mutation, Args } from "type-graphql";
import { userDao } from "../dao/user.dao";
import { UserDto } from "../dto/UserDto";
import { User } from "../model/User";

@Resolver()
export class AuthResolver {
  @Mutation(() => User)
  async signUp(@Args({ validate: false }) userDto: UserDto){
    const newUser = userDto as User;
    const dbUser = await userDao.createNewUser(newUser);
    return dbUser;
  }
}
