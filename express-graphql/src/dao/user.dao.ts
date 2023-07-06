import { Db } from "mongodb";
import { MongoConnection } from "../config/mongodb";
import { User } from "../model/User";
import { Service } from "typedi";
import { MongoCollections } from "../types/constants";

@Service()
class UserDao {
  private collection;
  constructor(db: Db) {
    this.collection = db.collection<User>(MongoCollections.User);
  }

  async createNewUser(newUser: User) {
    return await this.collection.insertOne(newUser);
  }

  async findUserByEmail(email: string) {
    return await this.collection.findOne({ email });
  }
}

export default UserDao;
