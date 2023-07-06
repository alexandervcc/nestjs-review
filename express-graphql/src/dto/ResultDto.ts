import { Field, ObjectType } from "type-graphql";

export interface Result {
  result: string;
  message: string;
}

@ObjectType()
export class ResultDto implements Result {
  @Field(() => String)
  result!: string;

  @Field(() => String)
  message!: string;
}
