import { Query, Resolver } from "type-graphql";

@Resolver()
export class StatusResolvers {
  @Query(() => String)
  status() {
    return "ok";
  }
}
