import { UserDto } from "../dto/UserDto";

const { MongoClient } = require("mongodb");

export const client = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export let db: { collection: (arg0: string) => { (): any; new(): any; save: { (arg0: UserDto): any; new(): any; }; }; };

export const connectMongoDB = async () => {
  try {
    client.connect();
    db = client.db("auth-graphql");
    console.log("Mongo DB conected!");
  } catch (error) {
    console.error("Error connecting to the Mongo DB: ", error);
  }
};
