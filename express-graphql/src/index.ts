require("dotenv").config();

import "reflect-metadata";
import { startServer } from "./app";
import { connectMongoDB } from "./config/mongodb";
import { connectMySqlDB } from "./config/typeorm-mysql";

const main = async () => {
  await connectMySqlDB();
  await connectMongoDB();
  const app = await startServer();
  const PORT = process.env.SERVER_PORT;
  app.listen(PORT);
  console.log("Server running on: ", PORT);
};

main();
