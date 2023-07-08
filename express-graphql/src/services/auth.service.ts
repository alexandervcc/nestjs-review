import { Result } from "../dto/ResultDto";
import { User, UserDto } from "../dto/UserDto";
import { ResultStatus } from "../types/enums/Result";
import { AuthServiceI } from "./interfaces/auth-service";
import KafkaProducer from "./kafka-producer";
import { Service, Inject } from "typedi";
import UserModel from "./../model/User";
import PasswordService from "./password.service";

@Service()
class AuthService implements AuthServiceI {
  constructor(
    @Inject() private kafkaProducer: KafkaProducer,
    @Inject() private passwordService: PasswordService
  ) {}

  async getUserById(_id: string): Promise<User | null> {
    return await UserModel.findById(_id);
  }

  async signUp(user: UserDto): Promise<Result> {
    const result: Result = {
      message: "User created.",
      result: ResultStatus.Success,
    };

    const userExists = await UserModel.find({
      $or: [{ email: user.email }, { username: user.username }],
    });

    if (userExists) {
      result.message = "Email/Username invalid, already in use.";
      result.result = ResultStatus.Error;
      return result;
    }

    const newUser = new UserModel({ ...user });
    const validationErrors = newUser.validateSync();

    console.log("errors: ", validationErrors);
    if (validationErrors) {
      result.message = "Invalid values.";
      result.result = ResultStatus.Error;
    }

    await newUser.save();

    return result;
  }
}

export default AuthService;
