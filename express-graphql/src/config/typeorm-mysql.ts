import { DataSource } from "typeorm";
import path, { resolve } from "path";
import { Product } from "../model/Product";

export const connectDB = async () => {
  const dbConnection = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "graphql",
    password: "graphql",
    database: "graphql",
    entities: [Product],
    synchronize: true,
  });
  try {
    await dbConnection.initialize();
    console.log("DB conected!");
  } catch (error) {
    console.error("Error connecting to the DB: ", error);
  }
};
