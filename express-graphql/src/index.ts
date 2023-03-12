import "reflect-metadata";
import { startServer } from "./app";

const SERVER_PORT = 3000;

const main = async () => {
  const app = await startServer();
  app.listen(SERVER_PORT);
  console.log("Server running on: ", SERVER_PORT);
};

main();
