import { User } from "../model/User";
import { Inject, Service } from "typedi";
import { MongoCollections } from "../types/constants";
import MongoConnection from "../config/mongodb";
import { ObjectId } from "mongodb";

@Service()
class UserDao {
  private collection;
  constructor(@Inject() mongo: MongoConnection) {
    this.collection = mongo.db.collection<User>(MongoCollections.User);
  }

  async createNewUser(newUser: User) {
    return await this.collection.insertOne(newUser);
  }

  async findUserByEmail(email: string) {
    return await this.collection.findOne({ email });
  }

  async findUserById(_id: ObjectId): Promise<User | null> {
    return await this.collection.findOne<User>({ _id });
  }
}

export default UserDao;
