import dotenv from 'dotenv'
import "reflect-metadata";
import { startServer } from "./app";
import { initializeDB } from "./dao";

dotenv.config();

const main = async () => {
  const PORT = process.env.SERVER_PORT;
  const MONGO_URL = process.env.MONGO_URL as string;
  const DB_NAME = process.env.DB_NAME as string;

  await initializeDB(MONGO_URL, DB_NAME);

  const app = await startServer();

  app.listen(PORT);
  console.log("Server running on: ", PORT);
};

main();
