import { Field, ObjectType } from "type-graphql";
import { Product } from "../model/Product";

@ObjectType()
export class ProductPayload {
  @Field(() => String)
  mutation!: string;

  @Field(() => Product, { nullable: true })
  data!: Product;
}
