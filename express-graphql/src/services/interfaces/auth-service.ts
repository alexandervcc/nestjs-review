import { Result } from "../../dto/ResultDto";
import { UserDto } from "../../dto/UserDto";

export interface AuthServiceI {
  signUp(user: UserDto): Promise<Result>;
}
