import { Int, Field, ArgsType } from "type-graphql";

@ArgsType()
export class ProductDto {
  @Field(() => String)
  name!: string;

  @Field(() => Int)
  qty!: number;
}
