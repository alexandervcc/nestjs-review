import { Field } from "type-graphql";

export interface Result {
  result: string;
  message: string;
}

export class ResultDto implements Result {
  @Field(() => String)
  result!: string;

  @Field(() => String)
  message!: string;
}
