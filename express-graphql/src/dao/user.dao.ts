import { Db } from "mongodb";
import { MongoConnection } from "../config/mongodb";
import { User } from "../model/User";
import { MongoCollections } from "../utils";

class UserDao {
  private userCollection;
  constructor(db: Db) {
    this.userCollection = db.collection<User>(MongoCollections.User);
  }

  async createNewUser(newUser: User) {
    try {
      const userDb = await this.userCollection.insertOne(newUser);
      return { ...newUser, _id: userDb.insertedId };
    } catch (error) {
      throw new Error(`User can not be created:  ${error}`);
    }
  }

  async findUser(user: User) {
    try {
      return await this.userCollection.findOne({ username: user.username });
    } catch (error) {
      throw new Error(`User can not be found:  ${error}`);
    }
  }
}

export let userDao: UserDao;

export const initializeUserDao = async () => {
  userDao = new UserDao(MongoConnection.db);
};
