import { Service } from "typedi";
import { User } from "../types/interfaces/User";
import jwt from "jsonwebtoken";

@Service()
class JwtService {
   private readonly secret: string;

  constructor() {
    this.secret = "xd";
  }

  createJwtToken(user: User) {
    const payload = { _id: user._id, username: user.username };
    return jwt.sign(payload, this.secret, { expiresIn: "24h" });
  }
}

export default JwtService;
