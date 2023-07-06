import {
  Resolver,
  Mutation,
  Args,
  Arg,
  Query,
  Subscription,
  PubSub,
  Root,
} from "type-graphql";
import { ProductDto } from "../dto/ProductDto";
import { PubSubEngine } from "graphql-subscriptions";
import { ProductPayload } from "../dto/ProductSubPayload";
import { Product } from "../model/Product";
import { productDao } from "../dao/product.dao";
import { GraphqlSubscriptionTopics } from "../types/constants";

@Resolver()
export class ProductResolver {
  @Mutation(() => ProductDto)
  async createProduct(
    @PubSub() pubSub: PubSubEngine,
    @Args({ validate: false }) productDto: ProductDto
  ) {
    const newProduct = productDto as Product;
    const dbProduct = await productDao.saveNewProduct(newProduct);
    const productSub: ProductPayload = {
      mutation: "CREATE",
      data: dbProduct,
    };
    await pubSub.publish(GraphqlSubscriptionTopics.Notification, productSub);
    return dbProduct;
  }

  @Mutation(() => Boolean)
  async deleteProduct(
    @PubSub() pubSub: PubSubEngine,
    @Arg("id", () => String) idProduct: string
  ): Promise<boolean> {
    console.log("Deleting Product: ", idProduct);
    await productDao.deleteById(idProduct);
    const productSub = {
      mutation: "DELETE",
      data: {},
    };
    await pubSub.publish(GraphqlSubscriptionTopics.Notification, productSub);
    return true;
  }

  @Query(() => [ProductDto])
  async products() {
    return await productDao.findAll();
  }

  @Subscription(() => ProductPayload, {
    topics: GraphqlSubscriptionTopics.Notification,
    nullable: true,
  })
  async normalSubscription(
    @Root() data: ProductPayload
  ): Promise<ProductPayload> {
    console.log("normal subscription: ", data);
    return data;
  }
}
