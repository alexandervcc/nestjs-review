import { MongoConnection } from "../config/mongodb";
import { initializeProductDao } from "./product.dao";
import { initializeUserDao } from "./user.dao";

export const initializeDB = async (MONGO_URL: string, DB_NAME: string) => {
  const db = new MongoConnection(MONGO_URL, DB_NAME);
  await db.initialize();
  await initializeProductDao();
  await initializeUserDao();
};
