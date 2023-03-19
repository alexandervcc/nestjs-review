import { MongoClient, Db } from "mongodb";
import { connect } from "mongoose";

export class MongoConnection {
  private client!: MongoClient;
  static db: Db;
  private dbConnected = false;

  constructor(private MONGO_URL: string, private DB_NAME: string) {
    this.client = new MongoClient(MONGO_URL);
    this.client.on("open", () => {
      this.dbConnected = true;
    });
    this.client.on("topologyClosed", () => {
      this.dbConnected = false;
    });
  }

  async initialize(): Promise<void> {
    if (!this.dbConnected) {
      await connect(this.MONGO_URL, {
        dbName: this.DB_NAME,
      });
      await this.client.connect();
      MongoConnection.db = this.client.db(this.DB_NAME);
      console.log("Connected to MongoDB server");
    }
  }
}
