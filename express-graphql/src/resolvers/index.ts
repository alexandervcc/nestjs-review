import { NonEmptyArray } from "type-graphql";
import AuthResolver from "./auth.resolver";

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  AuthResolver,
];
