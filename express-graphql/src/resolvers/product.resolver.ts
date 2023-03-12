import { Resolver, Mutation, Args, Query } from "type-graphql";
import { ProductDto } from "../dto/ProductDto";
import { Product } from "../model/Product";

@Resolver()
export class ProductResolver {
  @Mutation(() => Product)
  async createProduct(
    @Args({ validate: false }) productDto: ProductDto
  ): Promise<Product> {
    const newProduct = Product.create({ ...productDto });
    console.log("prod: ",productDto)
    return await newProduct.save();
  }

  @Query(() => [Product])
  async products() {
    return await Product.find();
  }
}
