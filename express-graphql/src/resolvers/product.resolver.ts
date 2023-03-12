import { Resolver, Mutation, Args, Arg, Query, Int } from "type-graphql";
import { ProductDto } from "../dto/ProductDto";
import { Product } from "../model/Product";

@Resolver()
export class ProductResolver {
  @Mutation(() => Product)
  async createProduct(
    @Args({ validate: false }) productDto: ProductDto
  ): Promise<Product> {
    const newProduct = Product.create({ ...productDto });
    console.log("prod: ", productDto);
    return await newProduct.save();
  }

  @Mutation(() => Boolean)
  async deleteProduct(
    @Arg("id", () => Int) idProduct: number
  ): Promise<Boolean> {
    console.log("Deleting Product: ",idProduct)
    await Product.delete(idProduct)
    return true;
  }

  @Query(() => [Product])
  async products() {
    return await Product.find();
  }
}
