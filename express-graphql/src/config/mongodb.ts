import "reflect-metadata";
import dotenv from "dotenv";
import { MongoClient, Db } from "mongodb";
import { Service } from "typedi";

dotenv.config();

@Service()
class MongoConnection {
  private client!: MongoClient;
  db!: Db;

  constructor() {
    (async () => {
      const MONGO_URL = process.env.MONGO_URL as string;
      const DB_NAME = process.env.DB_NAME as string;

      this.client = new MongoClient(MONGO_URL);
      await this.client.connect();
      this.db = this.client.db(DB_NAME);
      console.log("Connected to MongoDB server");
    })();
  }
}

export default MongoConnection;
