import { Service } from "typedi";
import * as bcrypt from "bcrypt";

@Service()
class PasswordService {
  private generateSalt(): string {
    return "crypto";
  }
  async hashPassword(cleanPassword: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(cleanPassword, salt);
    return hashedPassword;
  }

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}

export default PasswordService;
