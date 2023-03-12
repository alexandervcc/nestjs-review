import "reflect-metadata";
import { startServer } from "./app";
import { connectDB } from "./config/typeorm-mysql";

const SERVER_PORT = 3000;

const main = async () => {
  await connectDB();
  const app = await startServer();
  app.listen(SERVER_PORT);
  console.log("Server running on: ", SERVER_PORT);
};

main();
