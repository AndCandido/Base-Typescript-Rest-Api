import { config } from "dotenv";
import { injectable } from "inversify";
import { ITokenService } from "../interfaces";
import { TokenPayload } from "../models/auth";
import jwt from "jsonwebtoken";

config();

@injectable()
class TokenService implements ITokenService {
  public generateToken(tokenPayload: TokenPayload): string {
    const secretKey =
      process.env.TOKEN_SECRET_KEY ?? "84329bfuweh98hf32buhdshfiew";
    const expiresIn = process.env.TOKEN_EXPIRATION ?? "7d";

    const tokenSigned = jwt.sign(tokenPayload, secretKey, {
      expiresIn: expiresIn,
    });
    return tokenSigned;
  }
}

export default TokenService;
