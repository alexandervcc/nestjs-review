import { Int, Field, ArgsType } from "type-graphql";
import { Product } from "../model/Product";
import { ObjectId } from "mongodb";

@ArgsType()
export class ProductDto implements Omit<Product, "_id"> {
  @Field(() => ObjectId)
  _id?: ObjectId;

  @Field(() => String)
  name!: string;

  @Field(() => Int)
  qty!: number;
}
