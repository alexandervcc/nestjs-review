import { ObjectId } from "mongodb";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Product {
  @Field(() => String)
  _id!: ObjectId;

  @Field(() => String)
  name!: string;

  @Field(() => Int)
  qty!: number;
}
