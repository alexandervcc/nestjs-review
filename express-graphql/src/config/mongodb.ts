const { MongoClient } = require("mongodb");

let db: any;

export const connectMongoDB = async () => {
  try {
    if (!db) {
      const xdb = new MongoClient(process.env.MONGO_URL);
      console.log("Mongo DB conected!");
    }
    return db;
  } catch (error) {
    console.error("Error connecting to the Mongo DB: ", error);
  }
};
