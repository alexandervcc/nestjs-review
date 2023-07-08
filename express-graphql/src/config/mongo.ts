import "reflect-metadata";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Service } from "typedi";

dotenv.config();

@Service()
class MongoDBConnection {
  constructor() {
    (async () => {
      try {
        const DB_URL = process.env.MONGO_URL as string;
        
        await mongoose.connect(DB_URL);
        console.log("Connected to MongoDB");
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    })();
  }
}

export default MongoDBConnection;
