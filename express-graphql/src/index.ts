import "reflect-metadata";
import dotenv from "dotenv";
import { startServer } from "./app";
import { Container } from "typedi";
import MongoConnection from "./config/mongodb";
import UserDao from "./dao/user.dao";
import AuthService from "./services/auth.service";
import AuthResolver from "./resolvers/auth.resolver";

dotenv.config();

const main = async () => {
  const PORT = process.env.SERVER_PORT;
  Container.get(MongoConnection)
  const app = await startServer();

  app.listen(PORT);
  console.log("Server running on: ", PORT);
};

main();
