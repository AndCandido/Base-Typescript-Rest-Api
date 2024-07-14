import { config } from "dotenv";
import { injectable } from "inversify";
import { ITokenService } from "../interfaces";
import { TokenPayload } from "../models/auth";
import jsonwebtoken, { Jwt } from "jsonwebtoken";

config();

@injectable()
class TokenService implements ITokenService {
  private secretKey = process.env.TOKEN_SECRET_KEY;
  private tokenIssuer = process.env.TOKEN_ISSUER;

  public generateToken(tokenPayload: TokenPayload): string {
    const expiresIn = process.env.TOKEN_EXPIRATION ?? "7d";

    const tokenSigned = jsonwebtoken.sign(tokenPayload, this.secretKey!, {
      expiresIn: expiresIn,
      issuer: this.tokenIssuer,
      subject: tokenPayload.username,
    });

    return tokenSigned;
  }

  public validateToken(tokenToVerify: string): Jwt {
    const token = jsonwebtoken.verify(tokenToVerify, this.secretKey!, {
      issuer: this.tokenIssuer,
      complete: true,
    });

    return token;
  }
}

export default TokenService;
