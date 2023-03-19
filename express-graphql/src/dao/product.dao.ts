import { Db, ObjectId } from "mongodb";
import { MongoConnection } from "../config/mongodb";
import { Product } from "../model/Product";
import { constants } from "../utils/constants";

class ProductDao {
  private productCollection;
  constructor(db: Db) {
    this.productCollection = db.collection<Product>(
      constants.collections.product
    );
  }

  async saveNewProduct(newProduct: Product): Promise<Product> {
    try {
      const userDb = await this.productCollection.insertOne(newProduct);
      return { ...newProduct, _id: userDb.insertedId };
    } catch (error) {
      throw new Error("New product can not be created.");
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productCollection.find().toArray();
    } catch (error) {
      throw new Error(`Products can not be retrieved:  ${error}`);
    }
  }

  async deleteById(id: string) {
    const productId = new ObjectId(id);
    try {
      await this.productCollection.deleteOne({ _id: productId });
    } catch (error) {
      throw new Error(`Product selected can not be deleted: ${error}`);
    }
  }
}
export let productDao: ProductDao;

export const initializeProductDao = async () => {
  productDao = new ProductDao(MongoConnection.db);
};
