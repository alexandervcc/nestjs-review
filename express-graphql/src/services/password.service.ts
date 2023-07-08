import { Service } from "typedi";
import * as bcrypt from "bcrypt";

@Service()
class PasswordService {
  constructor() {}

  async hashPassword(cleanPassword: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(cleanPassword, salt);
    return hashedPassword;
  }

  async validatePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export default PasswordService;
