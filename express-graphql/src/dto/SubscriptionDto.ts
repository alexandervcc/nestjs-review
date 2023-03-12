import { Field } from "type-graphql";
import { Product } from "../model/Product";

export class ProductSubs extends Product {
  @Field(() => String)
  mutation!: string;
}
