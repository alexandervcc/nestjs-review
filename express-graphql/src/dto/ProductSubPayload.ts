import { Field, ObjectType, Int } from "type-graphql";
import { Product } from "../model/Product";

@ObjectType()
export class ProductPayload {
  @Field(() => String)
  mutation!: string;

  @Field(() => Product)
  data!: Product;
}
