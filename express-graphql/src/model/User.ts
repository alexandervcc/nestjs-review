import { ObjectId } from "mongoose";

export class User {
  _id!: ObjectId;
  username!: string;
  email!: string;
  password!: string;
}
