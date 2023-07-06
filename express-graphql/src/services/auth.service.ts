import { ObjectId } from "mongodb";
import UserDao from "../dao/user.dao";
import { Result, ResultDto } from "../dto/ResultDto";
import { UserDto } from "../dto/UserDto";
import { ResultStatus } from "../types/enums/Result";
import { AuthServiceI } from "./interfaces/auth-service";
import KafkaProducer from "./kafka-producer";
import { Service, Inject } from "typedi";

@Service()
class AuthService implements AuthServiceI {
  constructor(
    @Inject() private kafkaProducer: KafkaProducer,
    @Inject() private userDao: UserDao
  ) {}

  async signUp(user: UserDto): Promise<Result> {
    const result: Result = {
      message: "User created.",
      result: ResultStatus.Success,
    };
    const userExists = await this.userDao.findUserByEmail(user.email);

    if (userExists) {
      result.message = "Email invalid, already in use.";
      result.result = ResultStatus.Error;
      return result;
    }

    const userCreated = await this.userDao.createNewUser({
      ...user,
      _id: new ObjectId(),
    });

    if (!userCreated.acknowledged) {
      result.message = "Failed to create, try again later.";
      result.result = ResultStatus.Error;
    }

    return result;
  }
}

export default AuthService;
