import { Db } from "mongodb";
import { MongoConnection } from "../config/mongodb";
import { User } from "../model/User";
import { constants } from "../utils/constants";

class UserDao {
  private userCollection;
  constructor(db: Db) {
    this.userCollection = db.collection<User>(constants.collections.user);
  }

  async saveNewUser(newUser: User) {
    try {
      const userDb = await this.userCollection.insertOne(newUser);
      return userDb;
    } catch (error) {
      console.error("ERROR: ", error);
    }
  }
}

export let userDao: UserDao;

export const initializeUserDao = async () => {
  userDao = new UserDao(MongoConnection.db);
};
