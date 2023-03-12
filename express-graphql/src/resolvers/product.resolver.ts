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
import { ProductPayload } from "../dto/ProductSubPayload";
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
    const productSub: ProductPayload = {
      mutation: "CREATE",
      data: dbProduct,
    };
    await pubSub.publish(CONSTANTS.NOTIFICATION, productSub);
    return dbProduct;
  }

  @Mutation(() => Boolean)
  async deleteProduct(
    @PubSub() pubSub: PubSubEngine,
    @Arg("id", () => Int) idProduct: number
  ): Promise<Boolean> {
    console.log("Deleting Product: ", idProduct);
    const productDeleted = await Product.findBy({ id: idProduct });
    await Product.delete(idProduct);
    const productSub = {
      mutation: "DELETE",
      data: productDeleted,
    };
    await pubSub.publish(CONSTANTS.NOTIFICATION, productSub);
    return true;
  }

  @Query(() => [Product])
  async products() {
    return await Product.find();
  }

  @Subscription(() => ProductPayload, {
    topics: CONSTANTS.NOTIFICATION,
    nullable: true,
  })
  async normalSubscription(
    @Root() data: ProductPayload
  ): Promise<ProductPayload> {
    console.log("normal subscription: ", data);
    return data;
  }
}
