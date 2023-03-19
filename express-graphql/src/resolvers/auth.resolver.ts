import { Resolver, Mutation, Args } from "type-graphql";
import { db} from "../config/mongodb";
import { UserDto } from "../dto/UserDto";

@Resolver()
export class AuthResolver {
  @Mutation(() => String)
  async signUp(@Args({ validate: false }) newUser: UserDto): Promise<String> {
    try {
      console.log("db: ",db)
      const userDb = await db.collection("user").save(newUser)
      console.log("user created: ", userDb);
      return "created";
    } catch (error) {
      console.log("ERROR: ",error)
      return "error"
    }
  }
}
