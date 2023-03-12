import {
  Resolver,
  Mutation,
  Args,
  Arg,
  Query,
  Int,
  Subscription,
  PubSub,
  Root,
} from "type-graphql";
import { ProductDto } from "../dto/ProductDto";
import { Product } from "../model/Product";
import { PubSubEngine } from "graphql-subscriptions";
import { CONSTANTS } from "../utils/constants";
import { ProductSubs } from "../dto/SubscriptionDto";
const { v4: uuidv4 } = require("uuid");

@Resolver()
export class ProductResolver {
  @Mutation(() => Product)
  async createProduct(
    @PubSub() pubSub: PubSubEngine,
    @Args({ validate: false }) productDto: ProductDto
  ): Promise<Product> {
    const newProduct = Product.create({ ...productDto });
    console.log("prod: ", productDto);
    const dbProduct = await newProduct.save();
    const productSub = {
      ...dbProduct,
      mutation: "CREATE",
    };
    await pubSub.publish(CONSTANTS.NOTIFICATION, productSub);
    return dbProduct;
  }

  @Mutation(() => Boolean)
  async deleteProduct(
    @Arg("id", () => Int) idProduct: number
  ): Promise<Boolean> {
    console.log("Deleting Product: ", idProduct);
    await Product.delete(idProduct);
    return true;
  }

  @Query(() => [Product])
  async products() {
    return await Product.find();
  }

  //Dynamic Subscription to a topic
  @Mutation(() => Boolean)
  async pubSubMutationToDynamicTopic(
    @PubSub() pubSub: PubSubEngine,
    @Arg("topic") topic: string,
    @Arg("message", { nullable: true }) message?: string
  ): Promise<boolean> {
    const payload = { id: uuidv4(), message };
    await pubSub.publish(topic, payload);
    return true;
  }

  @Subscription(() => Boolean, { topics: CONSTANTS.NOTIFICATION })
  async normalSubscription(
    @Root() { id, message }: { id: string; message: string }
  ): Promise<any> {
    return { id, message, date: new Date() };
  }
}
