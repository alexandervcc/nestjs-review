import { Field, ObjectType } from "type-graphql";
import { Product } from "../model/Product";
import { ProductDto } from "./ProductDto";

@ObjectType()
export class ProductPayload {
  @Field(() => String)
  mutation!: string;

  @Field(() => ProductDto, { nullable: true })
  data!: ProductDto;
}
