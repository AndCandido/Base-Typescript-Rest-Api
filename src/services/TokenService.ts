import { injectable } from "inversify";
import { ITokenService } from "../interfaces";
import { TokenPayload } from "../models/auth";
import jwt from "jsonwebtoken";

@injectable()
class TokenService implements ITokenService {
  public generateToken(tokenPayload: TokenPayload): string {
    const secretKey =
      process.env.TOKEN_SECRET_KEY ?? "84329bfuweh98hf32buhdshfiew";
    const tokenSigned = jwt.sign(tokenPayload, secretKey, { expiresIn: "7d" });
    return tokenSigned;
  }
}

export default TokenService;
