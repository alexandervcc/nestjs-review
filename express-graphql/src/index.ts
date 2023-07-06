import "reflect-metadata";
import dotenv from "dotenv";
import { startServer } from "./app";
import { Container } from "typedi";
import MongoConnection from "./config/mongodb";

dotenv.config();

const main = async () => {
  //Start db connection
  Container.get(MongoConnection)

  const app = await startServer();
  
  const PORT = process.env.SERVER_PORT;
  app.listen(PORT);
  console.log("Server running on: ", PORT);
};

main();
