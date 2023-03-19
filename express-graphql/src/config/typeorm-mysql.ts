import { DataSource } from "typeorm";
import { Product } from "../model/Product";

export const connectMySqlDB = async () => {
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
    console.log("MySql DB conected!");
  } catch (error) {
    console.error("Error connecting to the MySql DB: ", error);
  }
};
