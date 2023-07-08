import "reflect-metadata";
import dotenv from "dotenv";
import { startServer } from "./app";
import { Container } from "typedi";
import MongoDBConnection from "./config/mongo";

dotenv.config();

const main = async () => {
  //Start db connection
  Container.get(MongoDBConnection);

  const app = await startServer();

  const PORT = process.env.SERVER_PORT;
  app.listen(PORT);
  console.log("Server running on: ", PORT);
};

main();
